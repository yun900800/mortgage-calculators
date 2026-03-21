/**
 * 应用主控制器
 * 职责：协调 MortgageCalculator 和 MortgageUI 的工作流程
 */
import MortgageCalculator from './MortgageCalculator.js';
import MortgageUI from './MortgageUI.js';
import LanguageEngine from './LanguageEngine.js';
import { translations } from '../translations.js';

export default class App {
    constructor() {
        // 初始化核心组件
        this.calculator = new MortgageCalculator();
        this.langEngine = new LanguageEngine(translations);

        // 实例化 UI 层，并传入操作回调
        this.ui = new MortgageUI({
            onCalculate: (inputs) => this.performCalculation(inputs),

            onQuickUpdate: (inputs) => {
                const balanceAtAction = this.calculator.getRemainingBalance(
                    inputs.amount,
                    inputs.term,
                    inputs.rate,
                    inputs.type,
                    inputs.actionMonth
                );

                const formatter = (val) => this.langEngine.formatCurrency(val);
                const trans = this.langEngine.translations[this.langEngine.lang];

                const monthLabel = trans.monthLabel || 'Month';
                const balanceLabel = trans.balanceLabel || 'Balance';
                const label = `${monthLabel} ${inputs.actionMonth} ${balanceLabel}:`;

                this.ui.renderBalanceHint(balanceAtAction, formatter, label);
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
        if (!inputs.amount || !inputs.term || !inputs.rate) return;

        this.lastInputs = inputs;

        // 检查是否开启了高级模式
        let effectiveIsAdvanced = inputs.isAdvanced;

        // 如果开启了，进一步检查金额是否大于 0
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

        // 执行计算
        const result = this.calculator.calculate({
            ...inputs,
            isAdvanced: effectiveIsAdvanced
        });

        const formatter = (val) => this.langEngine.formatCurrency(val);
        const trans = this.langEngine.translations[this.langEngine.lang];

        // 渲染主结果面板
        this.ui.renderMortgageResults(
            result.current,
            result.normal,
            inputs.isAdvanced,
            formatter,
            trans
        );

        // 渲染图表
        const chartData = this.calculator.getAmortizationSlice(
            inputs.amount,
            inputs.term,
            inputs.rate,
            inputs.type,
            inputs.viewMonth
        );

        // 更新单月明细
        if (chartData && chartData.length > 0) {
            const d = chartData[0];
            this.ui.updateMonthlyDetail(d.principal, d.interest, formatter);
        }
        this.ui.renderChart(chartData, formatter, this.langEngine.lang);

        // 更新余额提示
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
