/**
 * RESPONSIBILITY: Orchestrating the workflow.
 * 现在它协同 MortgageCalculator 和具体的 MortgageUI。
 */
import MortgageCalculator from './MortgageCalculator.js';
import MortgageUI from './MortgageUI.js'; // 1. 引入子类
import LanguageEngine from './LanguageEngine.js';
import { translations } from '../translations.js';
import { TimeScale } from 'chart.js';

export default class App {
    constructor() {
        // 1. 初始化核心组件
        this.calculator = new MortgageCalculator();
        this.langEngine = new LanguageEngine(translations);
        
        // 2. 实例化 UI 层，并传入操作回调
        this.ui = new MortgageUI({
            onCalculate: (inputs) => this.performCalculation(inputs),
            

            // 实时更新余额提示：精准指向提前还款月份
            onQuickUpdate: (inputs) => {
                // 【核心修改】：使用 inputs.actionMonth，这才是用户打算提前还款的那个点
                const balanceAtAction = this.calculator.getRemainingBalance(
                    inputs.amount,
                    inputs.term,
                    inputs.rate,
                    inputs.type,
                    inputs.actionMonth // 这里的 actionMonth 是动态抓取的提前还款月份
                );

                const formatter = (val) => this.langEngine.formatCurrency(val);
                const trans = this.langEngine.translations[this.langEngine.lang];
                
                // 渲染提示语。例如："第 60 个月（提前还款时）届时余额为：£100,000"
                // 这样用户在填写提前还款金额时，一眼就能看到剩下的总额，方便决定还多少。
                const monthLabel = trans.monthLabel || 'Month';
                const balanceLabel = trans.balanceLabel || 'Balance';
                
                const label = `${monthLabel} ${inputs.actionMonth} ${balanceLabel}:`;
                console.log(`App: Quick update - ${label} ${formatter(balanceAtAction)}`);
                this.ui.renderBalanceHint(balanceAtAction, formatter, label);
            },

            onClear: () => this.handleClear()
        });

        // 3. 状态缓存：用于在语言切换时自动刷新结果
        this.lastInputs = null;

        this.init();
    }

    /**
     * 初始化：绑定全局事件
     */
    init() {
        const langSelect = document.getElementById('lang-select');
    
        if (langSelect) {
            // 让下拉框选中当前引擎计算出的初始语言
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
     * 处理计算逻辑
     */
    handleCalculate() {
        // 从 UI 层获取格式化后的输入数据（包含基础参数和提前还款参数）
        const inputs = this.ui.getInputs();
        if (!inputs) return; // 校验失败则中止

        // 缓存当前输入
        this.lastInputs = inputs;

        this.performCalculation(inputs);
    }

    performCalculation(inputs) {
        if (!inputs.amount || !inputs.term || !inputs.rate) return;

        // 1. 整体结果计算 (基于 actionMonth)
        // const result = this.calculator.calculate(inputs);
        this.lastInputs = inputs; // 更新缓存的输入数据


        // --- 核心修复逻辑 ---
        // 1. 检查是否开启了高级模式
        let effectiveIsAdvanced = inputs.isAdvanced;

        // 2. 如果开启了，进一步检查金额是否大于 0
        if (effectiveIsAdvanced) {
            const extra = inputs.extraData;
            if (extra.mode === 'lump-sum') {
                // 如果是一次性还款，且金额为空或 <= 0，则关闭高级模式计算
                if (!extra.lumpAmount || extra.lumpAmount <= 0) {
                    effectiveIsAdvanced = false;
                }
            } else if (extra.mode === 'monthly-extra') {
                // 如果是每月额外还款，且金额为空或 <= 0
                if (!extra.monthlyExtra || extra.monthlyExtra <= 0) {
                    effectiveIsAdvanced = false;
                }
            }
        }
        console.log(`App: Effective isAdvanced = ${effectiveIsAdvanced} (Original: ${inputs.isAdvanced})`);

        // 3. 将校正后的 effectiveIsAdvanced 传入计算器
        const result = this.calculator.calculate({
            ...inputs,
            isAdvanced: effectiveIsAdvanced // 使用校正后的布尔值
        });
        // --- 修复结束 ---

        const formatter = (val) => this.langEngine.formatCurrency(val);
        const trans = this.langEngine.translations[this.langEngine.lang];

        // 2. 渲染主结果面板 (总额对比等)
        this.ui.renderMortgageResults(result.current, result.normal, inputs.isAdvanced, formatter, trans);

        // 3. 【重点修复】渲染图表报表：使用 viewMonth (你想看的那个月)
        const chartData = this.calculator.getAmortizationSlice(
            inputs.amount,
            inputs.term,
            inputs.rate,
            inputs.type,
            inputs.viewMonth // 这里使用查看月份
        );

        // 4. 同步更新“本月明细”文字：同样使用 viewMonth 的第一条数据
        if (chartData && chartData.length > 0) {
            const d = chartData[0];
            this.ui.updateMonthlyDetail(d.principal, d.interest, formatter);
        }
        this.ui.renderChart(chartData, formatter, this.langEngine.lang);

        // 5. 更新“届时余额”提示：根据还款操作月份 actionMonth
        const balanceAtAction = this.calculator.getRemainingBalance(
            inputs.amount,
            inputs.term,
            inputs.rate,
            inputs.type,
            inputs.actionMonth // 这里使用还款操作月
        );
        const monthLabel = trans.monthLabel || 'Month';
        const balanceLabel = trans.balanceLabel || 'Balance';
                
        const label = `${monthLabel} ${inputs.actionMonth} ${balanceLabel}:`;
        this.ui.renderBalanceHint(balanceAtAction, formatter, label);
    }

    /**
     * 处理语言切换：不仅翻译文字，还要刷新计算结果的货币符号
     */
    handleLanguageChange(newLang) {
        this.langEngine.setLanguage(newLang);
        
        // 如果当前已经有计算结果，使用缓存的输入重新渲染（更新货币单位）
        if (this.lastInputs) {
            this.performCalculation(this.lastInputs);
        }
    }

    /**
     * 处理清除逻辑
     */
    handleClear() {
        this.lastInputs = null; // 清空缓存
        
        // 恢复 UI 到初始状态（隐藏结果面板等）
        const beforeContainer = document.querySelector('.before-results-container');
        const resultsContainer = document.querySelector('.after-results-container');
        const rightContent = document.querySelector('.right-content');

        beforeContainer?.classList.remove('hidden');
        resultsContainer?.classList.add('hidden');
        rightContent?.classList.remove('after-reset');
        this.lastInputs = null; // 清空缓存的数据
    
        // 调用 UI 类中定义的复位逻辑
        this.ui.resetDisplay();
        
        console.log('App: State cleared.');
    }
}