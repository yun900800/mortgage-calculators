/**
 * 组合贷款计算引擎
 * 职责：分别计算商贷和公积金贷款，合并结果展示
 * 支持：等额本息、等额本金、先息后本三种还款方式
 * 支持：提前还款功能（商贷和公积金分别计算）
 */
import MortgageCalculator from './MortgageCalculator.js';

export default class CombinedCalculator extends MortgageCalculator {
    constructor() {
        super();
        this.calculator = new MortgageCalculator();
    }

    /**
     * 计算组合贷款
     * @param {Object} data - 组合贷款数据
     * @returns {Object} - 包含商贷、公积金、汇总结果
     */
    calculate(data) {
        const { commercial, housingFund, type, isAdvanced, extraData, viewMonth = 1 } = data;

        const commercialNormal = this._simulateSingle(
            commercial.amount,
            commercial.term,
            commercial.rate,
            type,
            { active: false },
            viewMonth
        );

        const housingFundNormal = this._simulateSingle(
            housingFund.amount,
            housingFund.term,
            housingFund.rate,
            type,
            { active: false },
            viewMonth
        );

        let commercialCurrent = commercialNormal;
        let housingFundCurrent = housingFundNormal;

        if (isAdvanced && extraData) {
            // 商贷的提前还款参数
            const commercialExtra = {
                active:
                    extraData.mode === 'lump-sum'
                        ? extraData.commercialLumpAmount > 0
                        : extraData.commercialMonthlyExtra > 0,
                mode: extraData.mode,
                lumpAmount: extraData.commercialLumpAmount || 0,
                lumpMonth: extraData.lumpMonth,
                lumpStrategy: extraData.lumpStrategy,
                monthlyExtra: extraData.commercialMonthlyExtra || 0,
                startMonth: extraData.startMonth
            };

            // 公积金的提前还款参数
            const housingFundExtra = {
                active:
                    extraData.mode === 'lump-sum'
                        ? extraData.housingFundLumpAmount > 0
                        : extraData.housingFundMonthlyExtra > 0,
                mode: extraData.mode,
                lumpAmount: extraData.housingFundLumpAmount || 0,
                lumpMonth: extraData.lumpMonth,
                lumpStrategy: extraData.lumpStrategy,
                monthlyExtra: extraData.housingFundMonthlyExtra || 0,
                startMonth: extraData.startMonth
            };

            commercialCurrent = this._simulateSingle(
                commercial.amount,
                commercial.term,
                commercial.rate,
                type,
                commercialExtra,
                viewMonth
            );

            housingFundCurrent = this._simulateSingle(
                housingFund.amount,
                housingFund.term,
                housingFund.rate,
                type,
                housingFundExtra,
                viewMonth
            );
        }

        return {
            commercial: { current: commercialCurrent, normal: commercialNormal },
            housingFund: { current: housingFundCurrent, normal: housingFundNormal },
            total: {
                current: {
                    monthlyPayment:
                        commercialCurrent.monthlyPayment + housingFundCurrent.monthlyPayment,
                    totalRepayment:
                        commercialCurrent.totalRepayment + housingFundCurrent.totalRepayment,
                    totalInterest:
                        commercialCurrent.totalInterest + housingFundCurrent.totalInterest,
                    breakdown: {
                        monthly:
                            commercialCurrent.breakdown.monthly +
                            housingFundCurrent.breakdown.monthly,
                        principal:
                            commercialCurrent.breakdown.principal +
                            housingFundCurrent.breakdown.principal,
                        interest:
                            commercialCurrent.breakdown.interest +
                            housingFundCurrent.breakdown.interest
                    }
                },
                normal: {
                    monthlyPayment:
                        commercialNormal.monthlyPayment + housingFundNormal.monthlyPayment,
                    totalRepayment:
                        commercialNormal.totalRepayment + housingFundNormal.totalRepayment,
                    totalInterest: commercialNormal.totalInterest + housingFundNormal.totalInterest,
                    breakdown: {
                        monthly:
                            commercialNormal.breakdown.monthly +
                            housingFundNormal.breakdown.monthly,
                        principal:
                            commercialNormal.breakdown.principal +
                            housingFundNormal.breakdown.principal,
                        interest:
                            commercialNormal.breakdown.interest +
                            housingFundNormal.breakdown.interest
                    }
                }
            }
        };
    }

    /**
     * 获取组合贷款的摊销切片数据
     */
    getAmortizationSlice(commercial, housingFund, type, startMonth, count = 5) {
        const commercialSlice = this.calculator.getAmortizationSlice(
            commercial.amount,
            commercial.term,
            commercial.rate,
            type,
            startMonth,
            count
        );

        const housingFundSlice = this.calculator.getAmortizationSlice(
            housingFund.amount,
            housingFund.term,
            housingFund.rate,
            type,
            startMonth,
            count
        );

        return commercialSlice.map((item, index) => {
            const housingFundItem = housingFundSlice[index] || {
                principal: 0,
                interest: 0,
                total: 0
            };
            return {
                month: item.month,
                principal: item.principal + housingFundItem.principal,
                interest: item.interest + housingFundItem.interest,
                total: item.total + housingFundItem.total
            };
        });
    }

    /**
     * 获取组合贷款在目标月份的剩余余额
     */
    getRemainingBalance(commercial, housingFund, type, targetMonth) {
        const commercialBalance = this.calculator.getRemainingBalance(
            commercial.amount,
            commercial.term,
            commercial.rate,
            type,
            targetMonth
        );

        const housingFundBalance = this.calculator.getRemainingBalance(
            housingFund.amount,
            housingFund.term,
            housingFund.rate,
            type,
            targetMonth
        );

        return commercialBalance + housingFundBalance;
    }

    /**
     * 封装单笔贷款模拟计算（兼容原 MortgageCalculator 接口）
     * @private
     */
    _simulateSingle(P, years, annualRate, type, extra, targetMonth) {
        return this.calculator._simulate(P, years, annualRate, type, extra, targetMonth);
    }
}
