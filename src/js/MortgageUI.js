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

        // 组合贷款相关元素
        this.combinedElements = {
            loanTypeToggle: document.getElementById('loan-type-toggle'),
            singleForm: document.getElementById('single-loan-form'),
            combinedForm: document.getElementById('combined-loan-form'),
            commercialAmount: document.getElementById('commercial-amount'),
            commercialTerm: document.getElementById('commercial-term'),
            commercialRate: document.getElementById('commercial-rate'),
            housingFundAmount: document.getElementById('housing-fund-amount'),
            housingFundTerm: document.getElementById('housing-fund-term'),
            housingFundRate: document.getElementById('housing-fund-rate'),
            combinedResults: document.getElementById('combined-results'),
            commercialMonthly: document.getElementById('commercial-monthly'),
            housingFundMonthly: document.getElementById('housing-fund-monthly'),
            commercialTotal: document.getElementById('commercial-total'),
            housingFundTotal: document.getElementById('housing-fund-total'),
            combinedBalanceHint: document.getElementById('combined-balance-hint')
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
        const isCombined = this._isCombinedLoanMode();

        if (isCombined) {
            return this._getCombinedInputs();
        }

        return this._getSingleInputs();
    }

    /**
     * 判断是否为组合贷款模式
     * @private
     */
    _isCombinedLoanMode() {
        const toggle = this.combinedElements.loanTypeToggle;
        return toggle?.value === 'combined';
    }

    /**
     * 获取单贷输入数据
     * @private
     */
    _getSingleInputs() {
        const isAdvanced = this.elements.earlyRepayToggle?.checked || false;
        const mode = this._getActiveMode();

        const viewMonth = parseInt(this.formElements.targetMonth?.value) || 1;
        const lumpMonth = parseInt(this.formElements.lumpSumMonth?.value) || 1;
        const monthlyExtraStart = parseInt(this.formElements.monthlyExtraStart?.value) || 1;
        const actionMonth = mode === 'lump-sum' ? lumpMonth : monthlyExtraStart;

        return {
            loanType: 'single',
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
     * 获取组合贷输入数据
     * @private
     */
    _getCombinedInputs() {
        const isAdvanced = this.elements.earlyRepayToggle?.checked || false;
        const mode = this._getActiveMode();

        const viewMonth = parseInt(this.formElements.targetMonth?.value) || 1;
        const lumpMonth = parseInt(document.getElementById('combined-lump-month')?.value) || 1;
        const monthlyExtraStart =
            parseInt(document.getElementById('combined-monthly-extra-start')?.value) || 1;
        const actionMonth = mode === 'lump-sum' ? lumpMonth : monthlyExtraStart;

        return {
            loanType: 'combined',
            commercial: {
                amount: this._getSafeFloat('commercial-amount'),
                term: parseFloat(this.combinedElements.commercialTerm?.value) || 0,
                rate: parseFloat(this.combinedElements.commercialRate?.value) || 0
            },
            housingFund: {
                amount: this._getSafeFloat('housing-fund-amount'),
                term: parseFloat(this.combinedElements.housingFundTerm?.value) || 0,
                rate: parseFloat(this.combinedElements.housingFundRate?.value) || 0
            },
            type:
                document.querySelector('input[name="mortgage-type"]:checked')?.value || 'repayment',
            viewMonth,
            actionMonth,
            isAdvanced,
            extraData: {
                active: isAdvanced,
                mode,
                commercialLumpAmount: this._getSafeFloat('commercial-lump-amount') || 0,
                housingFundLumpAmount: this._getSafeFloat('housing-fund-lump-amount') || 0,
                lumpMonth,
                lumpStrategy:
                    document.getElementById('combined-lump-strategy')?.value || 'reduce-term',
                commercialMonthlyExtra: this._getSafeFloat('commercial-monthly-extra') || 0,
                housingFundMonthlyExtra: this._getSafeFloat('housing-fund-monthly-extra') || 0,
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
     * 触发结果面板动画
     * @private
     */
    _triggerResultsAnimation() {
        if (!this.resultsContainer) return;

        // 移除可能存在的动画类
        this.resultsContainer.classList.remove('results-animate');

        // 强制重绘
        void this.resultsContainer.offsetWidth;

        // 添加动画类
        this.resultsContainer.classList.add('results-animate');
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
     * 渲染单贷结果
     */
    renderMortgageResults(current, normal, isAdvanced, formatter, trans) {
        // 隐藏空状态和组合贷结果，显示单贷结果
        const beforeContainer = document.querySelector('.before-results-container');
        const resultsHeader = document.querySelector('.after-results-container > .results-header');
        const singleResults = document.querySelector('.single-results');
        const combinedResults = document.getElementById('combined-results');
        const combinedResultsHeader = document.querySelector('.combined-results-header');

        beforeContainer?.classList.add('hidden');
        resultsHeader?.classList.remove('hidden');
        singleResults?.classList.remove('hidden');
        combinedResults?.classList.add('hidden');
        combinedResultsHeader?.classList.add('hidden');
        this.resultsContainer?.classList.remove('hidden');
        this.rightContent?.classList.add('after-reset');

        // 触发毛玻璃+纸片落下动画
        this._triggerResultsAnimation();

        // 处理原始总额对比显示
        this._renderOriginalTotal(current, normal, isAdvanced, formatter);

        // 渲染基础数值（带交错动画，产生计算仪式感）
        setTimeout(
            () => this._animateValue('monthly-repayments', current.monthlyPayment, formatter),
            0
        );
        setTimeout(
            () => this._animateValue('total-over-the-term', current.totalRepayment, formatter),
            80
        );
        setTimeout(
            () => this._animateValue('monthly-principal', current.breakdown.principal, formatter),
            160
        );
        setTimeout(
            () => this._animateValue('monthly-interest', current.breakdown.interest, formatter),
            240
        );

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
                setTimeout(() => this._animateValue('total-saved', interestSaved, formatter), 320);
            }

            if (this.elements.termShortened) {
                setTimeout(() => {
                    const monthUnit = trans.monthUnit || 'months';
                    this.elements.termShortened.innerText = `${monthsShortened} ${monthUnit}`;
                }, 360);
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

        // 点击整个 radio-input-container 选中 radio
        document.querySelectorAll('.radio-input-container').forEach((container) => {
            container.addEventListener('click', (e) => {
                const radio = container.querySelector('input[type="radio"]');
                if (radio) {
                    radio.checked = true;
                    radio.dispatchEvent(new Event('change', { bubbles: true }));
                }
            });
        });

        // 输入框3D按压效果
        document.querySelectorAll('.input-container').forEach((container) => {
            container.addEventListener('mousedown', () => {
                container.classList.add('active');
            });
            container.addEventListener('mouseup', () => {
                container.classList.remove('active');
            });
            container.addEventListener('mouseleave', () => {
                container.classList.remove('active');
            });
            container.addEventListener('touchstart', () => {
                container.classList.add('active');
            });
            container.addEventListener('touchend', () => {
                container.classList.remove('active');
            });
        });

        // Tab 切换
        document.querySelectorAll('.tab-item').forEach((tab) => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-item').forEach((t) => t.classList.remove('active'));
                tab.classList.add('active');
                this._toggleExtraFields(tab.dataset.mode);
            });
        });

        // 组合贷款切换
        const loanTypeToggle = document.getElementById('loan-type-toggle');
        const combinedForm = document.getElementById('combined-loan-form');

        if (loanTypeToggle) {
            loanTypeToggle.addEventListener('change', () => {
                this._toggleLoanForm(loanTypeToggle.value);
            });
        }

        // 监听组合贷表单变化，实时计算
        if (combinedForm) {
            combinedForm.addEventListener('input', (e) => {
                const triggerIds = [
                    'commercial-amount',
                    'commercial-term',
                    'commercial-rate',
                    'housing-fund-amount',
                    'housing-fund-term',
                    'housing-fund-rate'
                ];
                if (triggerIds.includes(e.target.id)) {
                    this.callbacks.onQuickUpdate(this.getInputs());
                }

                if (this.debounceTimer) clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    const inputs = this.getInputs();
                    if (
                        inputs.commercial?.amount &&
                        inputs.housingFund?.amount &&
                        inputs.commercial.term &&
                        inputs.housingFund.term
                    ) {
                        this.callbacks.onCalculate(inputs);
                    }
                }, 50);
            });
        }
    }

    /**
     * 切换单贷/组合贷表单
     * @private
     */
    _toggleLoanForm(type) {
        const beforeContainer = document.querySelector('.before-results-container');
        const resultsHeader = document.querySelector('.after-results-container > .results-header');
        const singleForm = document.getElementById('single-loan-form');
        const combinedForm = document.getElementById('combined-loan-form');
        const singleResults = document.querySelector('.single-results');
        const combinedResults = document.getElementById('combined-results');
        const combinedResultsHeader = document.querySelector('.combined-results-header');

        // 提前还款表单
        const lumpSumSingle = document.getElementById('lump-sum-fields-single');
        const lumpSumCombined = document.getElementById('lump-sum-fields-combined');
        const monthlyExtraSingle = document.getElementById('monthly-extra-fields-single');
        const monthlyExtraCombined = document.getElementById('monthly-extra-fields-combined');
        const activeMode = this._getActiveMode();

        if (type === 'combined') {
            singleForm?.classList.add('hidden');
            combinedForm?.classList.remove('hidden');
            beforeContainer?.classList.remove('hidden');
            resultsHeader?.classList.remove('hidden');
            singleResults?.classList.add('hidden');
            combinedResults?.classList.add('hidden');
            combinedResultsHeader?.classList.add('hidden');
            this.resultsContainer?.classList.add('hidden');

            // 切换提前还款表单
            if (activeMode === 'lump-sum') {
                lumpSumSingle?.classList.add('hidden');
                lumpSumCombined?.classList.remove('hidden');
                monthlyExtraSingle?.classList.add('hidden');
                monthlyExtraCombined?.classList.add('hidden');
            } else {
                lumpSumSingle?.classList.add('hidden');
                lumpSumCombined?.classList.add('hidden');
                monthlyExtraSingle?.classList.add('hidden');
                monthlyExtraCombined?.classList.remove('hidden');
            }
        } else {
            singleForm?.classList.remove('hidden');
            combinedForm?.classList.add('hidden');
            beforeContainer?.classList.remove('hidden');
            resultsHeader?.classList.remove('hidden');
            singleResults?.classList.remove('hidden');
            combinedResults?.classList.add('hidden');
            combinedResultsHeader?.classList.add('hidden');
            this.resultsContainer?.classList.add('hidden');

            // 切换提前还款表单
            if (activeMode === 'lump-sum') {
                lumpSumSingle?.classList.remove('hidden');
                lumpSumCombined?.classList.add('hidden');
                monthlyExtraSingle?.classList.add('hidden');
                monthlyExtraCombined?.classList.add('hidden');
            } else {
                lumpSumSingle?.classList.add('hidden');
                lumpSumCombined?.classList.add('hidden');
                monthlyExtraSingle?.classList.remove('hidden');
                monthlyExtraCombined?.classList.add('hidden');
            }
        }
    }

    /**
     * 渲染组合贷款结果
     */
    renderCombinedResults(result, formatter, _trans) {
        // 隐藏空状态，显示结果容器
        const beforeContainer = document.querySelector('.before-results-container');
        const resultsHeader = document.querySelector('.after-results-container > .results-header');
        const singleResults = document.querySelector('.single-results');
        const combinedResults = document.getElementById('combined-results');
        const combinedResultsHeader = document.querySelector('.combined-results-header');

        beforeContainer?.classList.add('hidden');
        resultsHeader?.classList.add('hidden');
        singleResults?.classList.add('hidden');
        combinedResults?.classList.remove('hidden');
        combinedResultsHeader?.classList.remove('hidden');
        this.resultsContainer?.classList.remove('hidden');
        this.rightContent?.classList.add('after-reset');

        // 触发毛玻璃+纸片落下动画
        this._triggerResultsAnimation();

        // 使用交错动画更新商贷结果
        setTimeout(
            () =>
                this._animateValue(
                    'commercial-monthly',
                    result.commercial.current.monthlyPayment,
                    formatter
                ),
            0
        );
        setTimeout(
            () =>
                this._animateValue(
                    'commercial-total',
                    result.commercial.current.totalRepayment,
                    formatter
                ),
            80
        );
        setTimeout(
            () =>
                this._animateValue(
                    'commercial-interest',
                    result.commercial.current.totalInterest,
                    formatter
                ),
            160
        );

        // 使用交错动画更新公积金结果
        setTimeout(
            () =>
                this._animateValue(
                    'housing-fund-monthly',
                    result.housingFund.current.monthlyPayment,
                    formatter
                ),
            80
        );
        setTimeout(
            () =>
                this._animateValue(
                    'housing-fund-total',
                    result.housingFund.current.totalRepayment,
                    formatter
                ),
            160
        );
        setTimeout(
            () =>
                this._animateValue(
                    'housing-fund-interest',
                    result.housingFund.current.totalInterest,
                    formatter
                ),
            240
        );

        // 使用交错动画更新汇总结果
        setTimeout(
            () =>
                this._animateValue(
                    'combined-monthly',
                    result.total.current.monthlyPayment,
                    formatter
                ),
            0
        );
        setTimeout(
            () =>
                this._animateValue(
                    'combined-total',
                    result.total.current.totalRepayment,
                    formatter
                ),
            80
        );
        setTimeout(
            () =>
                this._animateValue(
                    'combined-interest',
                    result.total.current.totalInterest,
                    formatter
                ),
            160
        );

        // 处理节省利息显示
        const combinedSavingsBox = document.getElementById('combined-savings-box');
        const interestSaved =
            result.total.normal.totalInterest - result.total.current.totalInterest;
        const hasSavings = interestSaved > 0;

        if (hasSavings) {
            combinedSavingsBox?.classList.remove('hidden');
            this._animateValue(
                'combined-original-total',
                result.total.normal.totalRepayment,
                formatter
            );
            this._animateValue('combined-interest-saved', interestSaved, formatter);
        } else {
            combinedSavingsBox?.classList.add('hidden');
        }

        // 更新单月明细（使用商贷+公积金的汇总）
        if (this.elements.monthlyPrincipal) {
            this.elements.monthlyPrincipal.innerText = formatter(
                result.total.current.breakdown.principal
            );
        }
        if (this.elements.monthlyInterest) {
            this.elements.monthlyInterest.innerText = formatter(
                result.total.current.breakdown.interest
            );
        }
    }

    /**
     * 渲染组合贷款余额提示
     */
    renderCombinedBalanceHint(balance, formatter, label) {
        if (this.combinedElements.combinedBalanceHint) {
            this.combinedElements.combinedBalanceHint.innerText =
                balance > 0 ? `${label} ${formatter(balance)}` : '';
        }
    }

    /**
     * 切换额外还款字段显示
     * @private
     */
    _toggleExtraFields(mode) {
        const isCombined = this._isCombinedLoanMode();

        const lumpSumSingle = document.getElementById('lump-sum-fields-single');
        const lumpSumCombined = document.getElementById('lump-sum-fields-combined');
        const monthlyExtraSingle = document.getElementById('monthly-extra-fields-single');
        const monthlyExtraCombined = document.getElementById('monthly-extra-fields-combined');

        if (isCombined) {
            // 组合贷模式
            if (lumpSumSingle) lumpSumSingle.classList.add('hidden');
            if (lumpSumCombined) lumpSumCombined.classList.toggle('hidden', mode !== 'lump-sum');
            if (monthlyExtraSingle) monthlyExtraSingle.classList.add('hidden');
            if (monthlyExtraCombined)
                monthlyExtraCombined.classList.toggle('hidden', mode !== 'monthly-extra');
        } else {
            // 单贷模式
            if (lumpSumSingle) lumpSumSingle.classList.toggle('hidden', mode !== 'lump-sum');
            if (lumpSumCombined) lumpSumCombined.classList.add('hidden');
            if (monthlyExtraSingle)
                monthlyExtraSingle.classList.toggle('hidden', mode !== 'monthly-extra');
            if (monthlyExtraCombined) monthlyExtraCombined.classList.add('hidden');
        }
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
        const duration = 300;
        const startValue = 0;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentVal = easeOut * (endValue - startValue) + startValue;
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
        const beforeContainer = document.querySelector('.before-results-container');
        const resultsHeader = document.querySelector('.after-results-container > .results-header');
        const singleResults = document.querySelector('.single-results');
        const combinedResults = document.getElementById('combined-results');
        const combinedResultsHeader = document.querySelector('.combined-results-header');

        beforeContainer?.classList.remove('hidden');
        resultsHeader?.classList.remove('hidden');
        singleResults?.classList.remove('hidden');
        combinedResults?.classList.add('hidden');
        combinedResultsHeader?.classList.add('hidden');
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
        this.clearErrors();

        const isCombined = this._isCombinedLoanMode();

        if (isCombined) {
            return this._validateCombined();
        }

        return this._validateSingle();
    }

    /**
     * 校验单贷表单
     * @private
     */
    _validateSingle() {
        let isValid = true;

        const amount = this.formElements.mortgageAmount;
        const term = this.formElements.mortgageTerm;
        const rate = this.formElements.interestRate;

        const amountVal = amount?.value.replace(/,/g, '') || '';
        if (!amountVal || isNaN(amountVal) || parseFloat(amountVal) <= 0) {
            this._setErrorFor(amount);
            isValid = false;
        }

        if (!term?.value || isNaN(term.value) || parseInt(term.value) <= 0) {
            this._setErrorFor(term);
            isValid = false;
        }

        if (!rate?.value || isNaN(rate.value) || parseFloat(rate.value) <= 0) {
            this._setErrorFor(rate);
            isValid = false;
        }

        if (!document.querySelector('input[name="mortgage-type"]:checked')) {
            const radioContainer = document.querySelector('.radio-group') || amount;
            this._setErrorFor(radioContainer);
            isValid = false;
        }

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
     * 校验组合贷表单
     * @private
     */
    _validateCombined() {
        let isValid = true;

        const commercialAmount = this.combinedElements.commercialAmount;
        const commercialTerm = this.combinedElements.commercialTerm;
        const commercialRate = this.combinedElements.commercialRate;
        const housingFundAmount = this.combinedElements.housingFundAmount;
        const housingFundTerm = this.combinedElements.housingFundTerm;
        const housingFundRate = this.combinedElements.housingFundRate;

        // 校验商贷
        const cAmountVal = commercialAmount?.value.replace(/,/g, '') || '';
        if (!cAmountVal || isNaN(cAmountVal) || parseFloat(cAmountVal) <= 0) {
            this._setErrorFor(commercialAmount);
            isValid = false;
        }
        if (
            !commercialTerm?.value ||
            isNaN(commercialTerm.value) ||
            parseInt(commercialTerm.value) <= 0
        ) {
            this._setErrorFor(commercialTerm);
            isValid = false;
        }
        if (
            !commercialRate?.value ||
            isNaN(commercialRate.value) ||
            parseFloat(commercialRate.value) <= 0
        ) {
            this._setErrorFor(commercialRate);
            isValid = false;
        }

        // 校验公积金
        const gAmountVal = housingFundAmount?.value.replace(/,/g, '') || '';
        if (!gAmountVal || isNaN(gAmountVal) || parseFloat(gAmountVal) <= 0) {
            this._setErrorFor(housingFundAmount);
            isValid = false;
        }
        if (
            !housingFundTerm?.value ||
            isNaN(housingFundTerm.value) ||
            parseInt(housingFundTerm.value) <= 0
        ) {
            this._setErrorFor(housingFundTerm);
            isValid = false;
        }
        if (
            !housingFundRate?.value ||
            isNaN(housingFundRate.value) ||
            parseFloat(housingFundRate.value) <= 0
        ) {
            this._setErrorFor(housingFundRate);
            isValid = false;
        }

        // 检查还款类型
        if (!document.querySelector('input[name="mortgage-type"]:checked')) {
            const radioContainer = document.querySelector('.radio-group') || commercialAmount;
            this._setErrorFor(radioContainer);
            isValid = false;
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
