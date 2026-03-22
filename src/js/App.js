/**
 * 应用主控制器
 * 职责：协调 MortgageCalculator 和 MortgageUI 的工作流程
 */
import MortgageCalculator from './MortgageCalculator.js';
import CombinedCalculator from './CombinedCalculator.js';
import MortgageUI from './MortgageUI.js';
import LanguageEngine from './LanguageEngine.js';
import { translations } from '../translations.js';

export default class App {
    constructor() {
        // 初始化核心组件
        this.calculator = new MortgageCalculator();
        this.combinedCalculator = new CombinedCalculator();
        this.langEngine = new LanguageEngine(translations);

        // 实例化 UI 层，并传入操作回调
        this.ui = new MortgageUI({
            onCalculate: (inputs) => this.performCalculation(inputs),

            onQuickUpdate: (inputs) => {
                const formatter = (val) => this.langEngine.formatCurrency(val);
                const trans = this.langEngine.translations[this.langEngine.lang];
                const monthLabel = trans.monthLabel || 'Month';
                const balanceLabel = trans.balanceLabel || 'Balance';
                const label = `${monthLabel} ${inputs.actionMonth} ${balanceLabel}:`;

                if (inputs.loanType === 'combined') {
                    const balanceAtAction = this.combinedCalculator.getRemainingBalance(
                        inputs.commercial,
                        inputs.housingFund,
                        inputs.type,
                        inputs.actionMonth
                    );
                    this.ui.renderCombinedBalanceHint(balanceAtAction, formatter, label);
                } else {
                    const balanceAtAction = this.calculator.getRemainingBalance(
                        inputs.amount,
                        inputs.term,
                        inputs.rate,
                        inputs.type,
                        inputs.actionMonth
                    );
                    this.ui.renderBalanceHint(balanceAtAction, formatter, label);
                }
            },

            onClear: () => this.handleClear()
        });

        // 状态缓存：用于在语言切换时自动刷新结果
        this.lastInputs = null;

        this.init();
    }

    /**
     * 初始化：绑定全局事件
     */
    init() {
        const langSelect = document.getElementById('lang-select');

        if (langSelect) {
            langSelect.value = this.langEngine.lang;

            langSelect.addEventListener('change', (e) => {
                const newLang = e.target.value;
                this.handleLanguageChange(newLang);
            });
        }

        // 初次渲染静态文本
        this.langEngine.updateStaticTexts();
    }

    /**
     * 执行计算
     */
    performCalculation(inputs) {
        // 检查是否为组合贷款
        if (inputs.loanType === 'combined') {
            this._performCombinedCalculation(inputs);
            return;
        }

        // 单贷计算
        if (!inputs.amount || !inputs.term || !inputs.rate) return;

        this.lastInputs = inputs;

        let effectiveIsAdvanced = inputs.isAdvanced;

        if (effectiveIsAdvanced) {
            const extra = inputs.extraData;
            if (extra.mode === 'lump-sum') {
                if (!extra.lumpAmount || extra.lumpAmount <= 0) {
                    effectiveIsAdvanced = false;
                }
            } else if (extra.mode === 'monthly-extra') {
                if (!extra.monthlyExtra || extra.monthlyExtra <= 0) {
                    effectiveIsAdvanced = false;
                }
            }
        }

        const result = this.calculator.calculate({
            ...inputs,
            isAdvanced: effectiveIsAdvanced
        });

        const formatter = (val) => this.langEngine.formatCurrency(val);
        const trans = this.langEngine.translations[this.langEngine.lang];

        this.ui.renderMortgageResults(
            result.current,
            result.normal,
            inputs.isAdvanced,
            formatter,
            trans
        );

        const chartData = this.calculator.getAmortizationSlice(
            inputs.amount,
            inputs.term,
            inputs.rate,
            inputs.type,
            inputs.viewMonth
        );

        if (chartData && chartData.length > 0) {
            const d = chartData[0];
            this.ui.updateMonthlyDetail(d.principal, d.interest, formatter);
        }
        this.ui.renderChart(chartData, formatter, this.langEngine.lang);

        const balanceAtAction = this.calculator.getRemainingBalance(
            inputs.amount,
            inputs.term,
            inputs.rate,
            inputs.type,
            inputs.actionMonth
        );
        const monthLabel = trans.monthLabel || 'Month';
        const balanceLabel = trans.balanceLabel || 'Balance';
        const label = `${monthLabel} ${inputs.actionMonth} ${balanceLabel}:`;
        this.ui.renderBalanceHint(balanceAtAction, formatter, label);
    }

    /**
     * 执行组合贷款计算
     */
    _performCombinedCalculation(inputs) {
        if (!inputs.commercial?.amount || !inputs.housingFund?.amount) return;
        if (!inputs.commercial.term || !inputs.housingFund.term) return;

        this.lastInputs = inputs;

        let effectiveIsAdvanced = inputs.isAdvanced;

        if (effectiveIsAdvanced) {
            const extra = inputs.extraData;
            if (extra.mode === 'lump-sum') {
                const hasCommercialLump = extra.commercialLumpAmount > 0;
                const hasHousingFundLump = extra.housingFundLumpAmount > 0;
                if (!hasCommercialLump && !hasHousingFundLump) {
                    effectiveIsAdvanced = false;
                }
            } else if (extra.mode === 'monthly-extra') {
                const hasCommercialExtra = extra.commercialMonthlyExtra > 0;
                const hasHousingFundExtra = extra.housingFundMonthlyExtra > 0;
                if (!hasCommercialExtra && !hasHousingFundExtra) {
                    effectiveIsAdvanced = false;
                }
            }
        }

        const result = this.combinedCalculator.calculate({
            ...inputs,
            isAdvanced: effectiveIsAdvanced
        });

        const formatter = (val) => this.langEngine.formatCurrency(val);
        const trans = this.langEngine.translations[this.langEngine.lang];

        this.ui.renderCombinedResults(result, formatter, trans);

        const chartData = this.combinedCalculator.getAmortizationSlice(
            inputs.commercial,
            inputs.housingFund,
            inputs.type,
            inputs.viewMonth
        );

        this.ui.renderChart(chartData, formatter, this.langEngine.lang);

        const balanceAtAction = this.combinedCalculator.getRemainingBalance(
            inputs.commercial,
            inputs.housingFund,
            inputs.type,
            inputs.actionMonth
        );
        const monthLabel = trans.monthLabel || 'Month';
        const balanceLabel = trans.balanceLabel || 'Balance';
        const label = `${monthLabel} ${inputs.actionMonth} ${balanceLabel}:`;
        this.ui.renderCombinedBalanceHint(balanceAtAction, formatter, label);
    }

    /**
     * 处理语言切换
     */
    handleLanguageChange(newLang) {
        this.langEngine.setLanguage(newLang);

        if (this.lastInputs) {
            this.performCalculation(this.lastInputs);
        }
    }

    /**
     * 处理清除逻辑
     */
    handleClear() {
        this.lastInputs = null;

        const beforeContainer = document.querySelector('.before-results-container');
        const resultsContainer = document.querySelector('.after-results-container');
        const rightContent = document.querySelector('.right-content');

        beforeContainer?.classList.remove('hidden');
        resultsContainer?.classList.add('hidden');
        rightContent?.classList.remove('after-reset');

        this.ui.resetDisplay();
    }
}
