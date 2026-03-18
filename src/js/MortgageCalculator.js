/**
 * RESPONSIBILITY: Handle all mortgage mathematical formulas.
 * EXTENSION POINT: Add 'providentFund' or 'mixedLoan' calculation methods.
 */
/**
 * RESPONSIBILITY: 房贷核心计算引擎，支持逐月模拟摊销和提前还款逻辑。
 */
export default class MortgageCalculator {
    constructor() {
        // 基础月供计算函数映射
        this.basePaymentFunctions = {
            repayment: this._getEMI.bind(this), // 等额本息
            decreasing: (P, r, n) => P / n + P * r, // 等额本金（首月）
            'interest-only': (P, r) => P * r // 先息后本
        };
    }

    /**
     * 主入口：对比常规和提前还款结果
     */
    calculate(data) {
        const { amount, term, rate, type, isAdvanced, extraData, viewMonth = 1 } = data;
        
        // 1. 计算常规情况 (Normal)
        const normal = this._simulate(amount, term, rate, type, { active: false }, viewMonth);
        
        // 2. 计算当前情况
        const current = isAdvanced 
            ? this._simulate(amount, term, rate, type, extraData, viewMonth)
            : normal;

        return { current, normal };
    }

    /**
     * 获取指定月份开始的本息切片数据
     * @param {number} P 贷款总额
     * @param {number} years 贷款年限
     * @param {number} annualRate 年利率 (如 3.5)
     * @param {string} type 还款类型
     * @param {number} startMonth 起始月份
     */
    getAmortizationSlice(P, years, annualRate, type, startMonth, count = 5) {
        const r = annualRate / 100 / 12;
        const n = years * 12;
        let balance = P;
        const results = [];
        
        // 计算等额本息的固定月供
        const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        // 模拟运行到 startMonth 之前的状态
        for (let i = 1; i <= n; i++) {
            const interestM = balance * r;
            let principalM = 0;

            if (type === 'repayment') {
                principalM = Math.min(balance, monthlyPayment - interestM);
            } else if (type === 'decreasing') {
                principalM = Math.min(balance, P / n);
            } else if (type === 'interest-only') {
                // 仅还利息：最后一期归还本金，其余月份为0
                principalM = (i === n) ? balance : 0;
            }

            // 关键：只有在用户指定的月份区间内才收集数据
            if (i >= startMonth && i < startMonth + count) {
                results.push({
                    month: i,
                    principal: principalM,
                    interest: interestM,
                    total: principalM + interestM
                });
            }

            balance -= principalM;
            // 性能优化：集齐数据或贷款清零则停止
            if (results.length >= count || balance < 0) break;
        }
        return results;
    }

    _simulate(P, years, annualRate, type, extra, targetMonth) {
        const r = annualRate / 100 / 12;
        const n = years * 12;
        
        let balance = P;
        let totalInterest = 0;
        let actualEndMonth = 0;
        let targetData = { monthly: 0, principal: 0, interest: 0 };
        
        // 初始月供基准
        let currentMonthlyBase = (type === 'decreasing') ? (P / n) : this.basePaymentFunctions[type](P, r, n);
        let balanceAtTarget = 0;

        for (let i = 1; i <= 600; i++) {
            if (balance <= 0.01) break;

            // 1. 计算本月利息 (基于当前剩余本金)
            const interestM = balance * r;
            let principalM = 0;

            // 2. 【关键：同步 script.js 逻辑】处理大额提前还款
            if (extra.active && extra.mode === 'lump-sum' && i === extra.lumpMonth) {
                balance -= extra.lumpAmount;
                if (balance < 0) balance = 0;
                // 如果是“减少月供”策略，立即重算后续每月的还款基准
                if (extra.lumpStrategy === 'reduce-monthly' && balance > 0) {
                    const remainingMonths = n - i; // 剩余月份，严格遵循你的 script.js 逻辑
                    if (remainingMonths > 0) {
                        if (type === 'repayment') {
                            // 等额本息：重算每月总月供
                            currentMonthlyBase = this._getEMI(balance, r, remainingMonths);
                        } else if (type === 'decreasing') {
                            // 等额本金：重算每月固定本金
                            currentMonthlyBase = balance / remainingMonths;
                        }
                    }
                }
            }

            // 3. 计算本月应还本金
            if (type === 'repayment') {
                // 等额本息：用当前的月供基准减去利息
                principalM = Math.min(balance, currentMonthlyBase - interestM);
            } else if (type === 'decreasing') {
                // 等额本金：直接取当前的固定本金基准
                principalM = Math.min(balance, currentMonthlyBase);
            } else if (type === 'interest-only') {
                principalM = (i === n) ? balance : 0;
            }

            // 4. 处理每月额外还款 (Monthly Extra)
            if (extra.active && extra.mode === 'monthly-extra' && i >= extra.startMonth) {
                balance -= extra.monthlyExtra;
                if (balance < 0) balance = 0;
            }

            // 记录目标月份数据
            if (i === targetMonth) {
                targetData = {
                    monthly: interestM + principalM,
                    principal: principalM,
                    interest: interestM
                };
                balanceAtTarget = balance;
            }

            // 5. 更新状态
            balance -= principalM;
            totalInterest += interestM;
            actualEndMonth = i;
        }

        return {
            // 返回首月月供或目标月月供
            monthlyPayment: targetMonth === 1 ? (type === 'decreasing' ? (P/n + P*r) : currentMonthlyBase) : targetData.monthly,
            totalRepayment: totalInterest + P,
            totalInterest: totalInterest,
            actualTermMonths: actualEndMonth,
            breakdown: targetData,
            remainingBalance: balanceAtTarget
        };
    }


    /**
     * 等额本息公式 (EMI)
     */
    _getEMI(P, r, n) {
        if (r === 0) return P / n;
        return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    /**
     * 快速获取特定月份的剩余余额（用于实时 Hint 预览）
     * 逻辑：在用户没有点击“计算”前，快速预览在不考虑提前还款情况下的基础余额
     */
    getRemainingBalance(P, years, annualRate, type, targetMonth) {
        const r = annualRate / 100 / 12;
        const n = years * 12;

        if (targetMonth >= n) return 0;
        if (targetMonth <= 0) return P;

        if (type === 'interest-only') return P; // 先息后本本金不变

        if (type === 'decreasing') {
            // 等额本金：余额 = 总本金 - (每月本金 * 已还月份)
            return Math.max(0, P - (P / n) * targetMonth);
        }

        // 等额本息：利用复利公式计算剩余本金
        const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const balance = P * Math.pow(1 + r, targetMonth) - 
                        (monthlyPayment * (Math.pow(1 + r, targetMonth) - 1)) / r;
        
        return Math.max(0, balance);
    }
}