import CalculatorUI from './CalculatorUI.js';

/**
 * 房贷特有的业务 UI 渲染
 * 职责：处理提前还款对比、动画效果和实时交互
 */
export default class MortgageUI extends CalculatorUI {
    constructor(callbacks) {
        super(callbacks);

        // 缓存 DOM 元素引用，避免重复查询
        this._cacheElements();

        // 防抖定时器
        this.debounceTimer = null;

        // 初始化交互逻辑
        this._initMortgageInteractions();
    }

    /**
     * 缓存所有需要的 DOM 元素
     * @private
     */
    _cacheElements() {
        // 容器元素
        this.resultsContainer = document.querySelector('.after-results-container');
        this.beforeContainer = document.querySelector('.before-results-container');
        this.rightContent = document.querySelector('.right-content');
        this.hintElement = document.getElementById('remaining-balance-hint');
        this.chartContainer = document.getElementById('mortgage-chart');
        this.chartTitle = document.getElementById('chart-title');
        this.savingsBox = document.getElementById('savings-box');

        // 结果显示元素
        this.elements = {
            monthlyRepayments: document.getElementById('monthly-repayments'),
            monthlyPrincipal: document.getElementById('monthly-principal'),
            monthlyInterest: document.getElementById('monthly-interest'),
            totalOverTerm: document.getElementById('total-over-the-term'),
            originalTotalContainer: document.getElementById('original-total-container'),
            originalTotalAmount: document.getElementById('original-total-amount'),
            totalSaved: document.getElementById('total-saved'),
            termShortened: document.getElementById('term-shortened'),
            earlyRepayToggle: document.getElementById('early-repay-toggle')
        };

        // 表单元素
        this.formElements = {
            mortgageAmount: document.getElementById('mortgage-amount'),
            mortgageTerm: document.getElementById('mortgage-term'),
            interestRate: document.getElementById('interest-rate'),
            targetMonth: document.getElementById('target-month'),
            lumpSumAmount: document.getElementById('lump-sum-amount'),
            lumpSumMonth: document.getElementById('lump-sum-month'),
            lumpSumStrategy: document.getElementById('lump-sum-strategy'),
            monthlyExtraAmount: document.getElementById('monthly-extra-amount'),
            monthlyExtraStart: document.getElementById('monthly-extra-start')
        };
    }

    /**
     * 重写事件初始化，添加实时监听
     */
    initEvents() {
        super.initEvents();

        // 实时联动：监听整个表单的 input 事件
        this.form.addEventListener('input', (e) => {
            const inputs = this.getInputs();

            // 定义会触发余额提示更新的字段
            const triggerIds = [
                'mortgage-amount',
                'mortgage-term',
                'interest-rate',
                'lump-sum-month',
                'monthly-extra-start'
            ];
            const targetId = e.target.id;

            if (triggerIds.includes(targetId) || e.target.name === 'mortgage-type') {
                this.callbacks.onQuickUpdate(inputs);
            }

            // 完整重算：防抖处理（所有字段都触发，包括提前还款金额）
            if (this.debounceTimer) clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                if (inputs.amount && inputs.term && inputs.rate) {
                    this.callbacks.onCalculate(inputs);
                }
            }, 50);
        });
    }

    /**
     * 获取表单输入数据
     */
    getInputs() {
        const isAdvanced = this.elements.earlyRepayToggle?.checked || false;
        const mode = this._getActiveMode();

        const viewMonth = parseInt(this.formElements.targetMonth?.value) || 1;
        const lumpMonth = parseInt(this.formElements.lumpSumMonth?.value) || 1;
        const monthlyExtraStart = parseInt(this.formElements.monthlyExtraStart?.value) || 1;
        const actionMonth = mode === 'lump-sum' ? lumpMonth : monthlyExtraStart;

        return {
            amount: this._getSafeFloat('mortgage-amount'),
            term: parseFloat(this.formElements.mortgageTerm?.value) || 0,
            rate: parseFloat(this.formElements.interestRate?.value) || 0,
            type:
                document.querySelector('input[name="mortgage-type"]:checked')?.value || 'repayment',

            viewMonth,
            actionMonth,

            isAdvanced,
            extraData: {
                active: isAdvanced,
                mode,
                lumpAmount: this._getSafeFloat('lump-sum-amount'),
                lumpMonth,
                lumpStrategy: this.formElements.lumpSumStrategy?.value || 'reduce-term',
                monthlyExtra: this._getSafeFloat('monthly-extra-amount'),
                startMonth: monthlyExtraStart
            }
        };
    }

    /**
     * 渲染余额提示小字
     */
    renderBalanceHint(balance, formatter, label) {
        if (!this.hintElement) return;
        this.hintElement.innerText = balance > 0 ? `${label} ${formatter(balance)}` : '';
    }

    /**
     * 渲染柱状图
     */
    renderChart(dataList, formatter, lang) {
        if (!this.chartContainer || !dataList.length) return;

        this.chartContainer.innerHTML = '';
        const startMonth = dataList[0].month;
        this.chartTitle.innerText =
            lang === 'zh' ? `第 ${startMonth} 个月起的本息结构` : `P&I from Month ${startMonth}`;

        dataList.forEach((item) => {
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
            this.chartContainer.appendChild(column);
        });
    }

    /**
     * 渲染主结果面板
     */
    renderMortgageResults(current, normal, isAdvanced, formatter, trans) {
        // 切换容器显示状态
        this._showResults();

        // 处理原始总额对比显示
        this._renderOriginalTotal(current, normal, isAdvanced, formatter);

        // 渲染基础数值
        this._animateValue('monthly-repayments', current.monthlyPayment, formatter);
        this._animateValue('total-over-the-term', current.totalRepayment, formatter);
        this._animateValue('monthly-principal', current.breakdown.principal, formatter);
        this._animateValue('monthly-interest', current.breakdown.interest, formatter);

        // 渲染节省信息
        this._renderSavings(current, normal, isAdvanced, formatter, trans);
    }

    /**
     * 显示结果容器
     * @private
     */
    _showResults() {
        this.beforeContainer?.classList.add('hidden');
        this.resultsContainer?.classList.remove('hidden');
        this.rightContent?.classList.add('after-reset');
    }

    /**
     * 渲染原始总额对比
     * @private
     */
    _renderOriginalTotal(current, normal, isAdvanced, formatter) {
        const container = this.elements.originalTotalContainer;
        const totalEl = this.elements.totalOverTerm;

        if (isAdvanced && normal.totalRepayment > current.totalRepayment) {
            container?.classList.remove('hidden');
            if (this.elements.originalTotalAmount) {
                this.elements.originalTotalAmount.innerText = formatter(normal.totalRepayment);
            }
            if (totalEl) totalEl.style.color = '#22c55e';
        } else {
            container?.classList.add('hidden');
            if (totalEl) totalEl.style.color = '';
        }
    }

    /**
     * 渲染节省信息
     * @private
     */
    _renderSavings(current, normal, isAdvanced, formatter, trans) {
        if (!this.savingsBox) return;

        const interestSaved = normal.totalInterest - current.totalInterest;
        const monthsShortened = normal.actualTermMonths - current.actualTermMonths;

        if (isAdvanced && (interestSaved > 0 || monthsShortened > 0)) {
            this.savingsBox.classList.remove('hidden');

            if (this.elements.totalSaved) {
                this._animateValue('total-saved', interestSaved, formatter);
            }

            if (this.elements.termShortened) {
                const monthUnit = trans.monthUnit || 'months';
                this.elements.termShortened.innerText = `${monthsShortened} ${monthUnit}`;
            }
        } else {
            this.savingsBox.classList.add('hidden');
        }
    }

    /**
     * 更新单月明细
     */
    updateMonthlyDetail(principal, interest, formatter) {
        if (this.elements.monthlyPrincipal) {
            this.elements.monthlyPrincipal.innerText = formatter(principal);
        }
        if (this.elements.monthlyInterest) {
            this.elements.monthlyInterest.innerText = formatter(interest);
        }
    }

    /**
     * 初始化房贷特有的交互逻辑
     * @private
     */
    _initMortgageInteractions() {
        // 直接从 DOM 获取开关元素，确保能找到
        const repayToggle = document.getElementById('early-repay-toggle');
        const advancedPanel = document.querySelector('.advanced-panel');

        if (repayToggle && advancedPanel) {
            // 设置初始状态：如果开关是打开的，移除 collapsed 类
            if (repayToggle.checked) {
                advancedPanel.classList.remove('collapsed');
            } else {
                advancedPanel.classList.add('collapsed');
            }

            repayToggle.addEventListener('change', () => {
                advancedPanel.classList.toggle('collapsed', !repayToggle.checked);
            });
        }

        // Tab 切换
        document.querySelectorAll('.tab-item').forEach((tab) => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-item').forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');
                this._toggleExtraFields(tab.dataset.mode);
            });
        });
    }

    /**
     * 切换额外还款字段显示
     * @private
     */
    _toggleExtraFields(mode) {
        const lumpFields = document.getElementById('lump-sum-fields');
        const monthlyFields = document.getElementById('monthly-extra-fields');

        if (lumpFields) lumpFields.classList.toggle('hidden', mode !== 'lump-sum');
        if (monthlyFields) monthlyFields.classList.toggle('hidden', mode !== 'monthly-extra');
    }

    /**
     * 获取当前激活的模式
     * @private
     */
    _getActiveMode() {
        const activeTab = document.querySelector('.tab-item.active');
        return activeTab ? activeTab.dataset.mode : 'lump-sum';
    }

    /**
     * 安全获取数值
     * @private
     */
    _getSafeFloat(id) {
        const el = document.getElementById(id);
        const val = el?.value || '0';
        return parseFloat(val.replace(/,/g, '')) || 0;
    }

    /**
     * 数字滚动动画
     * @private
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
     * 还原到初始状态
     */
    resetDisplay() {
        this.beforeContainer?.classList.remove('hidden');
        this.resultsContainer?.classList.add('hidden');
        this.rightContent?.classList.remove('after-reset');

        // 清除错误样式
        this.clearErrors();

        if (this.hintElement) this.hintElement.innerText = '';
    }

    /**
     * 校验表单输入
     */
    validate() {
        let isValid = true;
        this.clearErrors();

        const amount = this.formElements.mortgageAmount;
        const term = this.formElements.mortgageTerm;
        const rate = this.formElements.interestRate;

        // 检查贷款总额
        const amountVal = amount?.value.replace(/,/g, '') || '';
        if (!amountVal || isNaN(amountVal) || parseFloat(amountVal) <= 0) {
            this._setErrorFor(amount);
            isValid = false;
        }

        // 检查贷款期限
        if (!term?.value || isNaN(term.value) || parseInt(term.value) <= 0) {
            this._setErrorFor(term);
            isValid = false;
        }

        // 检查利率
        if (!rate?.value || isNaN(rate.value) || parseFloat(rate.value) <= 0) {
            this._setErrorFor(rate);
            isValid = false;
        }

        // 检查还款类型
        if (!document.querySelector('input[name="mortgage-type"]:checked')) {
            const radioContainer = document.querySelector('.radio-group') || amount;
            this._setErrorFor(radioContainer);
            isValid = false;
        }

        // 校验提前还款字段（如果开启了高级模式）
        const isAdvanced = this.elements.earlyRepayToggle?.checked;
        if (isAdvanced) {
            const mode = this._getActiveMode();
            if (mode === 'lump-sum') {
                const lAmount = this.formElements.lumpSumAmount;
                const lMonth = this.formElements.lumpSumMonth;
                if (!lAmount?.value || parseFloat(lAmount.value) <= 0) {
                    this._setErrorFor(lAmount);
                    isValid = false;
                }
                if (!lMonth?.value) {
                    this._setErrorFor(lMonth);
                    isValid = false;
                }
            } else {
                const eAmount = this.formElements.monthlyExtraAmount;
                if (!eAmount?.value || parseFloat(eAmount.value) <= 0) {
                    this._setErrorFor(eAmount);
                    isValid = false;
                }
            }
        }

        return isValid;
    }

    /**
     * 设置错误样式
     * @private
     */
    _setErrorFor(inputElement) {
        if (!inputElement) return;
        const container = inputElement.closest('.form-group') || inputElement.parentElement;
        container.classList.add('error-div');

        if (!container.querySelector('.error-msg')) {
            const errorSpan = document.createElement('span');
            errorSpan.className = 'error-msg';
            container.appendChild(errorSpan);
        }
    }

    /**
     * 清除错误样式
     */
    clearErrors() {
        document.querySelectorAll('.error-div').forEach((el) => el.classList.remove('error-div'));
        document.querySelectorAll('.error-msg').forEach((el) => el.remove());
    }
}
