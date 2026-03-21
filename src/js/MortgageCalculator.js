/**
 * 房贷核心计算引擎
 * 职责：处理所有房贷数学公式，支持逐月模拟摊销和提前还款逻辑
 */
export default class MortgageCalculator {
    static MAX_MONTHS = 600;
    static EPSILON = 0.01;

    constructor() {}

    /**
     * 主入口：对比常规和提前还款结果
     */
    calculate(data) {
        const { amount, term, rate, type, isAdvanced, extraData, viewMonth = 1 } = data;

        // normal: 不做任何提前还款的基准计算
        const normal = this._simulate(amount, term, rate, type, { active: false }, viewMonth);

        // current: 应用了提前还款策略的计算
        const current = isAdvanced
            ? this._simulate(amount, term, rate, type, extraData, viewMonth)
            : normal;

        return { current, normal };
    }

    /**
     * 获取指定月份开始的本息切片数据
     */
    getAmortizationSlice(P, years, annualRate, type, startMonth, count = 5) {
        const n = years * 12;
        const r = annualRate / 100 / 12;

        if (n <= 0 || !isFinite(n)) return [];

        const monthlyPrincipal = P / n;
        const emi = this._getEMI(P, r, n);
        const results = [];
        let balance = P;

        for (let i = 1; i <= n; i++) {
            const interestM = balance * r;

            let principalM;
            if (type === 'interest-only') {
                principalM = i === n ? balance : 0;
            } else if (type === 'decreasing') {
                principalM = monthlyPrincipal;
            } else {
                principalM = Math.min(balance, emi - interestM);
            }

            if (i >= startMonth && i < startMonth + count) {
                results.push({
                    month: i,
                    principal: Math.max(0, principalM),
                    interest: Math.max(0, interestM),
                    total: Math.max(0, principalM + interestM)
                });
            }

            balance -= principalM;
            if (balance < MortgageCalculator.EPSILON) break;
            if (results.length >= count) break;
        }
        return results;
    }

    /**
     * 核心模拟方法
     * @private
     */
    _simulate(P, years, annualRate, type, extra, targetMonth) {
        const n = years * 12;
        const r = annualRate / 100 / 12;
        const monthlyPrincipal = P / n;
        const emi = this._getEMI(P, r, n);

        let balance = P;
        let totalInterest = 0;
        let totalPayments = 0; // 累计总还款
        let actualEndMonth = 0;
        let targetData = { monthly: 0, principal: 0, interest: 0 };
        let balanceAtTarget = 0;

        // 提前还款相关参数
        let lumpSumApplied = false;
        const lumpSumAmount = extra.lumpAmount || 0;
        const lumpSumMonth = extra.lumpMonth || 1;
        const useReducedMonthly = extra.lumpStrategy === 'reduce-monthly';
        let newMonthlyPayment = emi;

        for (let i = 1; i <= MortgageCalculator.MAX_MONTHS; i++) {
            if (balance < MortgageCalculator.EPSILON) break;

            const interestM = balance * r;

            // 计算当前月供
            let monthlyPayment;
            if (type === 'decreasing') {
                monthlyPayment = Math.min(monthlyPrincipal, balance) + interestM;
            } else if (type === 'interest-only') {
                monthlyPayment = interestM + (i === n ? balance : 0);
            } else {
                monthlyPayment = emi;
            }

            // 如果已提前还款且采用减少月供策略
            if (lumpSumApplied && useReducedMonthly) {
                monthlyPayment = newMonthlyPayment;
            }

            // 计算本金部分
            let principalM = Math.max(0, monthlyPayment - interestM);
            principalM = Math.min(principalM, balance);

            // 处理大额一次性提前还款
            if (
                extra.active &&
                extra.mode === 'lump-sum' &&
                lumpSumAmount > 0 &&
                i === lumpSumMonth &&
                !lumpSumApplied
            ) {
                // 先扣减当月月供（包含利息+部分本金）
                balance = Math.max(0, balance - principalM);
                totalInterest += interestM;
                totalPayments += monthlyPayment;

                // 然后一次性还款直接减少本金
                const actualLumpSum = Math.min(lumpSumAmount, balance);
                balance = Math.max(0, balance - actualLumpSum);
                totalPayments += actualLumpSum; // 一次性还款计入总还款

                lumpSumApplied = true;

                // 如果是减少月供策略，重新计算新月供
                if (useReducedMonthly && balance > MortgageCalculator.EPSILON) {
                    const remainingMonths = Math.max(1, n - i);
                    if (type === 'repayment') {
                        newMonthlyPayment = this._getEMI(balance, r, remainingMonths);
                    } else if (type === 'decreasing') {
                        newMonthlyPayment = balance / remainingMonths + balance * r;
                    } else {
                        newMonthlyPayment = balance * r;
                    }
                }

                // 记录目标月份数据
                if (i === targetMonth) {
                    targetData = {
                        monthly: monthlyPayment,
                        principal: principalM + actualLumpSum,
                        interest: interestM
                    };
                    balanceAtTarget = balance;
                }

                actualEndMonth = i;
                continue;
            }

            // 处理每月额外还款
            if (extra.active && extra.mode === 'monthly-extra' && i >= (extra.startMonth || 0)) {
                const extraPrincipal = Math.min(extra.monthlyExtra || 0, balance);
                principalM += extraPrincipal;
                balance = Math.max(0, balance - extraPrincipal);
            }

            // 记录目标月份数据
            if (i === targetMonth) {
                targetData = {
                    monthly: Math.max(0, monthlyPayment),
                    principal: Math.max(0, principalM),
                    interest: Math.max(0, interestM)
                };
                balanceAtTarget = Math.max(0, balance);
            }

            // 还款扣减
            balance = Math.max(0, balance - principalM);
            totalInterest += interestM;
            totalPayments += monthlyPayment;
            actualEndMonth = i;
        }

        return {
            monthlyPayment:
                targetData.monthly || (type === 'decreasing' ? monthlyPrincipal + P * r : emi),
            totalRepayment: totalPayments,
            totalInterest,
            actualTermMonths: actualEndMonth,
            breakdown: targetData,
            remainingBalance: balanceAtTarget
        };
    }

    /**
     * 等额本息公式 (EMI)
     * @private
     */
    _getEMI(P, r, n) {
        if (n <= 0) return 0;
        if (r === 0) return P / n;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return isFinite(emi) ? emi : 0;
    }

    /**
     * 快速获取特定月份的剩余余额
     */
    getRemainingBalance(P, years, annualRate, type, targetMonth) {
        const n = years * 12;
        const r = annualRate / 100 / 12;

        if (targetMonth <= 0) return P;
        if (targetMonth >= n) return 0;

        if (type === 'interest-only') return P;

        if (type === 'decreasing') {
            const monthlyPrincipal = P / n;
            return Math.max(0, P - monthlyPrincipal * targetMonth);
        }

        if (r === 0) return Math.max(0, P - (P / n) * targetMonth);

        const emi = this._getEMI(P, r, n);
        if (emi <= 0) return P;

        const factor = Math.pow(1 + r, targetMonth);
        if (!isFinite(factor)) return 0;

        const balance = P * factor - (emi * (factor - 1)) / r;

        return isFinite(balance) ? Math.max(0, balance) : 0;
    }
}
