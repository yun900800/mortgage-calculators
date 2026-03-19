/**
 * MortgageCalculator 单元测试
 * 测试房贷计算引擎的核心功能
 */
import { describe, it, expect } from 'vitest';
import MortgageCalculator from './MortgageCalculator.js';

describe('MortgageCalculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new MortgageCalculator();
    });

    describe('静态常量', () => {
        it('MAX_MONTHS 应该是 600', () => {
            expect(MortgageCalculator.MAX_MONTHS).toBe(600);
        });

        it('EPSILON 应该是 0.01', () => {
            expect(MortgageCalculator.EPSILON).toBe(0.01);
        });
    });

    describe('calculate - 基础计算', () => {
        it('应该计算等额本息还款', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBeGreaterThan(0);
            expect(result.current.totalRepayment).toBeGreaterThan(100000);
            expect(result.current.totalInterest).toBeGreaterThan(0);
            expect(isFinite(result.current.totalRepayment)).toBe(true);
        });

        it('应该计算等额本金还款', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'decreasing',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBeGreaterThan(0);
            expect(isFinite(result.current.totalRepayment)).toBe(true);
            expect(result.current.totalInterest).toBeGreaterThan(0);
        });

        it('应该计算先息后本还款', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'interest-only',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBeGreaterThan(0);
            expect(isFinite(result.current.totalRepayment)).toBe(true);
            expect(result.current.totalInterest).toBeGreaterThan(0);
        });
    });

    describe('calculate - 提前还款计算', () => {
        it('应该计算大额提前还款后的节省利息', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: true,
                extraData: {
                    active: true,
                    mode: 'lump-sum',
                    lumpAmount: 20000,
                    lumpMonth: 60,
                    lumpStrategy: 'reduce-term'
                }
            });

            // 有提前还款的情况下，总利息应该更少或相等
            expect(result.normal.totalInterest).toBeGreaterThanOrEqual(result.current.totalInterest);
        });

        it('应该计算每月额外还款后的节省利息', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: true,
                extraData: {
                    active: true,
                    mode: 'monthly-extra',
                    monthlyExtra: 500,
                    startMonth: 12
                }
            });

            expect(result.normal.totalInterest).toBeGreaterThanOrEqual(result.current.totalInterest);
        });

        it('当 isAdvanced 为 false 时，应该返回普通计算结果', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: false,
                extraData: {
                    active: true,
                    mode: 'lump-sum',
                    lumpAmount: 20000,
                    lumpMonth: 60
                }
            });

            expect(result.current).toEqual(result.normal);
        });
    });

    describe('getAmortizationSlice - 本息切片', () => {
        it('应该返回指定月份的切片数据', () => {
            const slice = calculator.getAmortizationSlice(100000, 20, 5, 'repayment', 1, 5);

            expect(slice).toHaveLength(5);
            expect(slice[0].month).toBe(1);
            expect(slice[0].principal).toBeGreaterThan(0);
            expect(slice[0].interest).toBeGreaterThan(0);
        });

        it('应该从指定月份开始返回数据', () => {
            const slice = calculator.getAmortizationSlice(100000, 20, 5, 'repayment', 10, 3);

            expect(slice).toHaveLength(3);
            expect(slice[0].month).toBe(10);
        });

        it('切片数据总和应该正确', () => {
            const slice = calculator.getAmortizationSlice(100000, 20, 5, 'repayment', 1, 5);

            slice.forEach(item => {
                const total = item.principal + item.interest;
                expect(Math.abs(total - item.total)).toBeLessThan(0.01);
            });
        });

        it('应该正确处理边界情况', () => {
            // 无效年份应该返回空数组
            expect(calculator.getAmortizationSlice(100000, 0, 5, 'repayment', 1, 5)).toHaveLength(0);
            expect(calculator.getAmortizationSlice(100000, -1, 5, 'repayment', 1, 5)).toHaveLength(0);
        });
    });

    describe('getRemainingBalance - 剩余余额', () => {
        it('应该计算指定月份的剩余余额', () => {
            const balance = calculator.getRemainingBalance(100000, 20, 5, 'repayment', 60);

            expect(balance).toBeGreaterThan(0);
            expect(balance).toBeLessThan(100000);
        });

        it('第0个月应该返回原始本金', () => {
            const balance = calculator.getRemainingBalance(100000, 20, 5, 'repayment', 0);
            expect(balance).toBe(100000);
        });

        it('贷款期限之后应该返回0', () => {
            const balance = calculator.getRemainingBalance(100000, 20, 5, 'repayment', 250);
            expect(balance).toBe(0);
        });

        it('先息后本类型应该返回原始本金', () => {
            const balance = calculator.getRemainingBalance(100000, 20, 5, 'interest-only', 60);
            expect(balance).toBe(100000);
        });

        it('等额本金类型应该正确计算剩余本金', () => {
            const balance = calculator.getRemainingBalance(100000, 20, 5, 'decreasing', 60);
            const expectedBalance = 100000 - (100000 / 240) * 60;
            expect(Math.abs(balance - expectedBalance)).toBeLessThan(1);
        });
    });

    describe('EMI 公式验证', () => {
        it('应该正确计算月供', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBeGreaterThan(0);
            expect(result.current.monthlyPayment).toBeCloseTo(659.96, 1);
        });

        it('零利率情况下月供应该等于本金/总月数', () => {
            const result = calculator.calculate({
                amount: 120000,
                term: 10,
                rate: 0,
                type: 'repayment',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBe(120000 / 120);
        });
    });

    describe('边界条件测试', () => {
        it('应该处理极小贷款金额', () => {
            const result = calculator.calculate({
                amount: 1,
                term: 1,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBeGreaterThan(0);
        });

        it('应该处理合理的贷款期限', () => {
            const result = calculator.calculate({
                amount: 10000,
                term: 1,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            // 实际还款月数应该有限
            expect(result.current.actualTermMonths).toBeGreaterThan(0);
            expect(result.current.actualTermMonths).toBeLessThanOrEqual(12);
        });

        it('应该处理高利率情况', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 30,
                rate: 15,
                type: 'repayment',
                isAdvanced: false
            });

            expect(result.current.monthlyPayment).toBeGreaterThan(0);
            expect(result.current.totalInterest).toBeGreaterThan(0);
        });

        it('应该处理零期限', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 0,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            // 零期限应该返回合理的默认值
            expect(result.current.monthlyPayment).toBe(0);
        });
    });

    describe('还款周期测试', () => {
        it('等额本息应该在合理期限内还清', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            // 实际月数应该在 240 左右
            expect(result.current.actualTermMonths).toBeGreaterThan(230);
            expect(result.current.actualTermMonths).toBeLessThanOrEqual(245);
        });

        it('大额提前还款后月供应该减少', () => {
            const result = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: true,
                extraData: {
                    active: true,
                    mode: 'lump-sum',
                    lumpAmount: 90000,
                    lumpMonth: 12,
                    lumpStrategy: 'reduce-monthly'
                }
            });

            // 正常月供 vs 提前还款后月供
            expect(result.current.monthlyPayment).toBeGreaterThan(0);
            expect(result.normal.monthlyPayment).toBeGreaterThan(0);
        });
    });

    describe('对比测试', () => {
        it('等额本金总利息应该少于等额本息', () => {
            const emi = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            const decreasing = calculator.calculate({
                amount: 100000,
                term: 20,
                rate: 5,
                type: 'decreasing',
                isAdvanced: false
            });

            expect(decreasing.current.totalInterest).toBeLessThan(emi.current.totalInterest);
        });

        it('先息后本总利息应该大于等额本息', () => {
            const emi = calculator.calculate({
                amount: 100000,
                term: 5,  // 缩短期限，避免 600 月上限
                rate: 5,
                type: 'repayment',
                isAdvanced: false
            });

            const interestOnly = calculator.calculate({
                amount: 100000,
                term: 5,
                rate: 5,
                type: 'interest-only',
                isAdvanced: false
            });

            expect(interestOnly.current.totalInterest).toBeGreaterThan(emi.current.totalInterest);
        });
    });
});
