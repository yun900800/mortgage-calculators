import CalculatorUI from './CalculatorUI.js';
import { translations } from '../translations.js';

/**
 * 职责：处理房贷特有的业务 UI 渲染，包括提前还款对比和动画效果。
 * 扩展点：可以进一步集成 Chart.js 渲染 script.js 中的柱状图。
 */
export default class MortgageUI extends CalculatorUI {
    constructor(callbacks) {
        super(callbacks);
        // 缓存房贷特有的 DOM 元素
        this.resultsContainer = document.querySelector('.after-results-container');
        this.beforeContainer = document.querySelector('.before-results-container');
        this.rightContent = document.querySelector('.right-content');
        this.hintElement = document.getElementById('remaining-balance-hint');

        // 缓存你提供的 HTML 专用 ID
        this.savingsBox = document.getElementById('savings-box');
        this.totalSavedEl = document.getElementById('total-saved');
        this.termShortenedEl = document.getElementById('term-shortened');
        // 初始化房贷特有的 UI 状态
        this._initMortgageInteractions();
        this.debounceTimer = null;
    }

    /**
     * 重写事件初始化，添加实时监听
     */
    initEvents() {
        super.initEvents(); // 保留原有的 submit 监听
        // 实时联动：监听整个表单的 input 事件
        this.form.addEventListener('input', (e) => {
            const inputs = this.getInputs();
            
            // 1. 余额提示：立即更新（无需防抖，体感更快）
            const targetId = e.target.id;
            const targetName = e.target.name;
            console.log(`Input changed: ${targetId} (${targetName})`);
            
            // 定义会触发余额提示更新的字段
            const triggerIds = ['mortgage-amount', 'mortgage-term', 'interest-rate', 'lump-sum-month', 'monthly-extra-start'];
            
            if (triggerIds.includes(targetId) || targetName === 'mortgage-type') {
                // 触发回调，让 App 去算，算完再回调 renderHint

                this.callbacks.onQuickUpdate(this.getInputs());
            }

            // 2. 完整重算：防抖处理（50ms 内多次输入只算最后一次）
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                // 仅在必要数据完整时触发完整渲染
                if (inputs.amount && inputs.term && inputs.rate) {
                    this.callbacks.onCalculate(inputs);
                }
            }, 50);
        });
    }

    /**
     * 渲染余额提示小字
     */
    renderBalanceHint(balance, formatter, label) {
        console.log(`MortgageUI: Rendering balance hint - ${label} ${formatter(balance)}`);
        if (!this.hintElement) return;
        if (balance > 0) {
            this.hintElement.innerText = `${label} ${formatter(balance)}`;
        } else {
            this.hintElement.innerText = "";
        }
    }

    getInputs() {
        const isAdvanced = document.getElementById('early-repay-toggle')?.checked || false;
        const mode = this._getActiveMode();

        // 锚点 1：报表查看月份 (对应下方的滑块)
        const viewMonth = parseInt(document.getElementById('target-month')?.value) || 1;

        // 锚点 2：提前还款操作月份 (对应面板中的月份)
        const lumpMonth = parseInt(document.getElementById('lump-sum-month')?.value) || 1;
        const monthlyExtraStart = parseInt(document.getElementById('monthly-extra-start')?.value) || 1;

        // 根据模式决定真正的还款操作起始月
        const actionMonth = (mode === 'lump-sum') ? lumpMonth : monthlyExtraStart;

        return {
            amount: this._getSafeFloat('mortgage-amount'),
            term: parseFloat(document.getElementById('mortgage-term')?.value) || 0,
            rate: parseFloat(document.getElementById('interest-rate')?.value) || 0,
            type: document.querySelector('input[name="mortgage-type"]:checked')?.value || 'repayment',
            
            viewMonth: viewMonth,   // 仅用于图表和当月数值显示
            actionMonth: actionMonth, // 仅用于提前还款余额计算
            
            isAdvanced: isAdvanced,
            extraData: {
                active: isAdvanced,
                mode: mode,
                lumpAmount: this._getSafeFloat('lump-sum-amount'),
                lumpMonth: lumpMonth,
                lumpStrategy: document.getElementById('lump-sum-strategy')?.value || 'reduce-term',
                monthlyExtra: this._getSafeFloat('monthly-extra-amount'),
                startMonth: monthlyExtraStart
            }
        };
    }

    // 渲染柱状图（保持你之前的结构，但增加高度计算的鲁棒性）
    renderChart(dataList, formatter, lang) {
        const chartContainer = document.getElementById('mortgage-chart');
        const chartTitle = document.getElementById('chart-title');
        if (!chartContainer || !dataList.length) return;

        chartContainer.innerHTML = '';
        const startMonth = dataList[0].month;
        console.log(`lang: ${lang}`);
        chartTitle.innerText = lang === 'zh' ? `第 ${startMonth} 个月起的本息结构` : `P&I from Month ${startMonth}`;

        dataList.forEach(item => {
            const total = item.principal + item.interest;
            const pHeight = total > 0 ? (item.principal / total) * 100 : 0;
            const iHeight = total > 0 ? (item.interest / total) * 100 : 100;

            const column = document.createElement('div');
            column.className = 'chart-column';
            column.innerHTML = `
                <div class="top-label">${formatter(total)}</div>
                <div class="bar-stack" style="height: 120px">
                    <div class="bar-part principal" style="height: ${pHeight}%">
                        ${pHeight > 20 ? `<span class="inner-label">${Math.round(item.principal)}</span>` : ''}
                    </div>
                    <div class="bar-part interest" style="height: ${iHeight}%">
                        ${iHeight > 20 ? `<span class="inner-label">${Math.round(item.interest)}</span>` : ''}
                    </div>
                </div>
                <div class="month-label">M${item.month}</div>
            `;
            chartContainer.appendChild(column);
        });
    }

    /**
     * [核心渲染]：对比常规和当前计算结果
     */
    renderMortgageResults(current, normal, isAdvanced, formatter, trans) {
        // 1. 切换右侧面板显示状态
        this.beforeContainer.classList.add('hidden');
        this.resultsContainer.classList.remove('hidden');
        this.rightContent.classList.add('after-reset');

        // 2. 核心逻辑：处理“原始总额”与“现总额”的对比展示
        const originalTotalContainer = document.getElementById('original-total-container');
        const originalTotalAmount = document.getElementById('original-total-amount');
        if (isAdvanced && normal.totalRepayment > current.totalRepayment) {
            // 如果开启了高级模式且真的省钱了，显示原始总额
            originalTotalContainer?.classList.remove('hidden');
            if (originalTotalAmount) {
                originalTotalAmount.innerText = formatter(normal.totalRepayment);
            }
            // 给当前的还款总额 ID 加一个高亮颜色，突出“这是省钱后的结果”
            document.getElementById('total-over-the-term').style.color = "#22c55e"; 
        } else {
            // 普通模式，隐藏对比
            originalTotalContainer?.classList.add('hidden');
            document.getElementById('total-over-the-term').style.color = ""; 
        }

        // 2. 渲染基础月供与总额 (ID 需要与 HTML 对应，假设为 monthly-repayments)
        this._animateValue('monthly-repayments', current.monthlyPayment, formatter);
        this._animateValue('total-over-the-term', current.totalRepayment, formatter);
        
        this._animateValue('monthly-interest', current.breakdown.interest, formatter);


        // 3. 渲染单月明细（本金/利息）
        const principalEl = document.getElementById('monthly-principal');
        const interestEl = document.getElementById('monthly-interest');
        if (principalEl) this._animateValue('monthly-principal', current.breakdown.principal, formatter);;
        if (interestEl) this._animateValue('monthly-interest', current.breakdown.interest, formatter);

        // 4. 调用内部对比渲染函数
        // 注意：我们将 trans 也传递进去，或者在 UI 类内部持有 langEngine 引用
        // this._renderComparison(current, normal, isAdvanced, formatter, trans);
        // 4. 处理提前还款对比（savings-box）
        this._renderSavings(current, normal, isAdvanced, formatter, trans);
    }

    /**
     * [内部逻辑]：专门处理 savings-box 的显示与内容更新
     */
    _renderSavings(current, normal, isAdvanced, formatter, trans) {
        if (!this.savingsBox) return;

        const interestSaved = normal.totalInterest - current.totalInterest;
        const monthsShortened = normal.actualTermMonths - current.actualTermMonths;

        // 只有开启高级模式且真的省了钱/时间才显示 savings-box
        if (isAdvanced && (interestSaved > 0 || monthsShortened > 0)) {
            this.savingsBox.classList.remove('hidden');

            // 更新节省利息金额
            if (this.totalSavedEl) {
                this._animateValue('total-saved', interestSaved, formatter);
            }

            // 更新缩短年限文本
            if (this.termShortenedEl) {
                const monthUnit = trans.monthUnit || 'months';
                this.termShortenedEl.innerText = `${monthsShortened} ${monthUnit}`;
            }
        } else {
            this.savingsBox.classList.add('hidden');
        }
    }

    /**
     * [内部私有渲染]：渲染省钱对比结果
     */
    _renderComparison(current, normal, isAdvanced, formatter, trans) {
        const summaryDiv = document.getElementById('comparison-summary');
        if (!summaryDiv) return;

        // 1. 计算差异
        const interestSaved = normal.totalInterest - current.totalInterest;
        const monthsShortened = normal.actualTermMonths - current.actualTermMonths;

        // 2. 逻辑判断
        if (isAdvanced && (interestSaved > 0 || monthsShortened > 0)) {
            summaryDiv.style.display = 'block';
            
            summaryDiv.innerHTML = `
                <div class="comparison-card">
                    ${interestSaved > 0 ? `
                        <div class="save-item highlight">
                            <span class="label">🎉 ${trans.totalSaved}:</span>
                            <span class="value">${formatter(interestSaved)}</span>
                        </div>
                    ` : ''}
                    
                    ${monthsShortened > 0 ? `
                        <div class="save-item">
                            <span class="label">⏳ ${trans.termShortened}:</span>
                            <span class="value">${monthsShortened} ${trans.monthUnit}</span>
                        </div>
                    ` : ''}
                    
                    <div class="comparison-hint">
                        ${trans.compareHint || 'Compared to original plan'}
                    </div>
                </div>
            `;
        } else {
            summaryDiv.style.display = 'none';
        }
    }

    /**
     * 辅助方法：安全获取数值
     */
    _getSafeFloat(id) {
        const val = document.getElementById(id)?.value || "0";
        return parseFloat(val.replace(/,/g, '')) || 0;
    }

    /**
     * 辅助方法：数字滚动动画
     */
    _animateValue(id, endValue, formatter) {
        const obj = document.getElementById(id);
        if (!obj) return;
        
        let startTimestamp = null;
        const duration = 800;
        const startValue = 0;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentVal = progress * (endValue - startValue) + startValue;
            obj.innerText = formatter(currentVal);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    /**
     * 初始化房贷特有的交互逻辑：开关切换、Tab 切换等
     */
    _initMortgageInteractions() {
        const repayToggle = document.getElementById('early-repay-toggle');
        console.log('MortgageUI: Initializing interactions. repayToggle:', repayToggle);
        const advancedPanel = document.querySelector('.advanced-panel');
        const tabs = document.querySelectorAll('.tab-item');

        // 1. 提前还款面板开关
        repayToggle?.addEventListener('change', () => {
            if (advancedPanel) {
                advancedPanel.classList.toggle('collapsed', !repayToggle.checked);
            }
        });

        // 2. 提前还款模式切换 (Tab)
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 更新 UI 样式
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // 控制输入字段的显示/隐藏
                const mode = tab.dataset.mode;
                this._toggleExtraFields(mode);
            });
        });
    }

    /**
     * 辅助方法：切换一次性还款和每月额外还款的字段显示
     */
    _toggleExtraFields(mode) {
        const lumpFields = document.getElementById('lump-sum-fields');
        const monthlyFields = document.getElementById('monthly-extra-fields');

        if (lumpFields) lumpFields.classList.toggle('hidden', mode !== 'lump-sum');
        if (monthlyFields) monthlyFields.classList.toggle('hidden', mode !== 'monthly-extra');
    }

    /**
     * 获取当前激活的模式（供 getInputs 调用）
     */
    _getActiveMode() {
        const activeTab = document.querySelector('.tab-item.active');
        return activeTab ? activeTab.dataset.mode : 'lump-sum';
    }

    /**
     * 专门用于实时更新特定月份的本息数值显示
     */
    updateMonthlyDetail(principal, interest, formatter) {
        const principalEl = document.getElementById('monthly-principal');
        const interestEl = document.getElementById('monthly-interest');
        
        // 使用格式化后的数值直接更新文本，不建议在这里加动画，否则实时滑动时会闪烁
        if (principalEl) principalEl.innerText = formatter(principal);
        if (interestEl) interestEl.innerText = formatter(interest);
    }

    /**
     * 还原房贷特有的结果面板和样式
     */
    resetDisplay() {
        // 1. 切换容器显示状态
        this.beforeContainer.classList.remove('hidden');
        this.resultsContainer.classList.add('hidden');
        
        // 2. 移除右侧内容的特定样式类
        this.rightContent.classList.remove('after-reset');
        
        // 3. 清除所有的错误提示样式（基于你原来的类名）
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('.error-div').forEach(el => el.classList.remove('error-div'));
        
        // 4. 重置图表或其它动态生成的提示
        if (this.hintElement) this.hintElement.innerText = '';
        
        // 如果有 Chart.js 实例，也可以在这里 destroy
    }

    /**
     * 校验逻辑：还原并增强 script.js 的 checkInputs
     */
    validate() {
        let isValid = true;
        this.clearErrors(); // 每次校验前先清理旧的错误样式

        const amount = document.getElementById('mortgage-amount');
        const term = document.getElementById('mortgage-term');
        const rate = document.getElementById('interest-rate');
        const typeChecked = document.querySelector('input[name="mortgage-type"]:checked');

        // 1. 检查贷款总额 (处理逗号并转为数字)
        const amountVal = amount.value.replace(/,/g, '');
        if (!amountVal || isNaN(amountVal) || parseFloat(amountVal) <= 0) {
            this._setErrorFor(amount);
            isValid = false;
        }

        // 2. 检查贷款期限
        if (!term.value || isNaN(term.value) || parseInt(term.value) <= 0) {
            this._setErrorFor(term);
            isValid = false;
        }

        // 3. 检查利率
        if (!rate.value || isNaN(rate.value) || parseFloat(rate.value) <= 0) {
            this._setErrorFor(rate);
            isValid = false;
        }

        // 4. 检查还款类型 (Radio)
        if (!typeChecked) {
            // 如果没有选中，给第一个 radio 的容器添加错误样式
            const radioContainer = document.querySelector('.radio-group') || amount; 
            this._setErrorFor(radioContainer);
            isValid = false;
        }

        // --- 扩展：校验提前还款字段 (如果开启了高级模式) ---
        const isAdvanced = document.getElementById('advanced-toggle')?.checked;
        if (isAdvanced) {
            const mode = this._getActiveMode();
            if (mode === 'lump-sum') {
                const lAmount = document.getElementById('lump-sum-amount');
                const lMonth = document.getElementById('lump-sum-month');
                if (!lAmount.value || parseFloat(lAmount.value) <= 0) { this._setErrorFor(lAmount); isValid = false; }
                if (!lMonth.value) { this._setErrorFor(lMonth); isValid = false; }
            } else {
                const eAmount = document.getElementById('monthly-extra-amount');
                if (!eAmount.value || parseFloat(eAmount.value) <= 0) { this._setErrorFor(eAmount); isValid = false; }
            }
        }

        return isValid;
    }

    /**
     * 内部辅助方法：设置错误样式 (对应你原来的 setErrorFor)
     */
    _setErrorFor(inputElement) {
        // 找到最近的容器（通常是带有 .input-group 或 .field 的 div）
        const container = inputElement.closest('.form-group') || inputElement.parentElement;
        container.classList.add('error-div');

        // 如果还没有错误消息，动态添加一个（可选）
        if (!container.querySelector('.error-msg')) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-msg';
            // errorSpan.innerText = 'This field is required'; // 也可以从语言引擎获取翻译
            container.appendChild(errorSpan);
        }
    }

    /**
     * 清除错误样式
     */
    clearErrors() {
        document.querySelectorAll('.error-div').forEach(el => el.classList.remove('error-div'));
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
    }
}