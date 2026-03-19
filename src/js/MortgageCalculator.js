/**
 * 房贷核心计算引擎
 * 职责：处理所有房贷数学公式，支持逐月模拟摊销和提前还款逻辑
 * 扩展点：可添加公积金贷款或组合贷款计算方法
 */
export default class MortgageCalculator {
    // 最大还款月份限制（50年 * 12个月）
    static MAX_MONTHS = 600;
    // 浮点数精度误差阈值
    static EPSILON = 0.01;

    constructor() {
        // 空构造函数
    }

    /**
     * 主入口：对比常规和提前还款结果
     * @param {Object} data - 计算参数
     * @returns {Object} - 包含 current 和 normal 两种情况的结果
     */
    calculate(data) {
        const { amount, term, rate, type, isAdvanced, extraData, viewMonth = 1 } = data;
        
        const normal = this._simulate(amount, term, rate, type, { active: false }, viewMonth);
        
        const current = isAdvanced 
            ? this._simulate(amount, term, rate, type, extraData, viewMonth)
            : normal;

        return { current, normal };
    }

    /**
     * 获取指定月份开始的本息切片数据
     * @param {number} P - 贷款总额
     * @param {number} years - 贷款年限
     * @param {number} annualRate - 年利率 (如 3.5)
     * @param {string} type - 还款类型
     * @param {number} startMonth - 起始月份
     * @param {number} count - 返回数据条数
     * @returns {Array} - 本息数据数组
     */
    getAmortizationSlice(P, years, annualRate, type, startMonth, count = 5) {
        const n = years * 12;
        const r = annualRate / 100 / 12;
        
        // 边界检查
        if (n <= 0 || !isFinite(n)) return [];
        
        const monthlyPrincipal = P / n; // 每月本金（等额本金）
        const emi = this._getEMI(P, r, n); // 月供（等额本息）
        const results = [];
        let balance = P;
        let principalM, interestM;

        for (let i = 1; i <= n; i++) {
            interestM = balance * r;
            
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
     * 核心模拟方法：模拟整个还款周期
     * @private
     */
    _simulate(P, years, annualRate, type, extra, targetMonth) {
        const n = years * 12;
        const r = annualRate / 100 / 12;
        const monthlyPrincipal = P / n; // 每月固定本金
        const emi = this._getEMI(P, r, n); // 等额本息月供
        
        let balance = P;
        let totalInterest = 0;
        let actualEndMonth = 0;
        let targetData = { monthly: 0, principal: 0, interest: 0 };
        let balanceAtTarget = 0;

        for (let i = 1; i <= MortgageCalculator.MAX_MONTHS; i++) {
            if (balance < MortgageCalculator.EPSILON) break;

            const interestM = balance * r;
            
            let principalM;
            let monthlyPayment;

            if (type === 'decreasing') {
                // 等额本金：每月本金固定，利息递减
                principalM = Math.min(monthlyPrincipal, balance);
                monthlyPayment = principalM + interestM;
            } else if (type === 'interest-only') {
                // 先息后本：每月还利息，最后一个月还本金
                principalM = (i === n) ? balance : 0;
                monthlyPayment = interestM + principalM;
            } else {
                // 等额本息：每月月供固定，本金递增
                principalM = Math.min(balance, emi - interestM);
                monthlyPayment = emi;
            }

            // 处理大额提前还款
            if (extra.active && extra.mode === 'lump-sum' && i === extra.lumpMonth) {
                const newBalance = balance - (extra.lumpAmount || 0);
                balance = Math.max(0, newBalance);
                
                // 重新计算剩余期限的月供
                if (extra.lumpStrategy === 'reduce-monthly' && balance > MortgageCalculator.EPSILON) {
                    const remainingMonths = Math.max(1, n - i);
                    if (type === 'repayment') {
                        // 等额本息：重新计算月供
                        const newR = annualRate / 100 / 12;
                        // 使用新的月供计算方式
                    } else if (type === 'decreasing') {
                        // 等额本金：重新计算每月本金
                    }
                }
            }

            // 处理每月额外还款
            if (extra.active && extra.mode === 'monthly-extra' && i >= (extra.startMonth || 0)) {
                balance = Math.max(0, balance - (extra.monthlyExtra || 0));
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

            balance -= principalM;
            totalInterest += interestM;
            actualEndMonth = i;
        }

        return {
            monthlyPayment: targetData.monthly || (type === 'decreasing' ? monthlyPrincipal + P * r : emi),
            totalRepayment: P + totalInterest,
            totalInterest: totalInterest,
            actualTermMonths: actualEndMonth,
            breakdown: targetData,
            remainingBalance: balanceAtTarget
        };
    }

    // ==================== 私有辅助方法 ====================

    /**
     * 等额本息公式 (EMI)
     * EMI = P × r × (1+r)^n / ((1+r)^n - 1)
     * @private
     */
    _getEMI(P, r, n) {
        if (n <= 0) return 0;
        if (r === 0) return P / n;
        const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return isFinite(emi) ? emi : 0;
    }

    /**
     * 快速获取特定月份的剩余余额（用于实时 Hint 预览）
     * @param {number} P - 贷款总额
     * @param {number} years - 贷款年限
     * @param {number} annualRate - 年利率
     * @param {string} type - 还款类型
     * @param {number} targetMonth - 目标月份
     * @returns {number} - 剩余余额
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

        // 等额本息：利用复利公式计算剩余本金
        if (r === 0) return Math.max(0, P - (P / n) * targetMonth);
        
        const emi = this._getEMI(P, r, n);
        if (emi <= 0) return P;
        
        const factor = Math.pow(1 + r, targetMonth);
        if (!isFinite(factor)) return 0;
        
        const balance = P * factor - (emi * (factor - 1)) / r;
        
        return isFinite(balance) ? Math.max(0, balance) : 0;
    }
}
