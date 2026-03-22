import { describe, it, expect } from 'vitest';
import CombinedCalculator from './CombinedCalculator.js';

describe('CombinedCalculator', () => {
    const calculator = new CombinedCalculator();

    describe('calculate', () => {
        it('should calculate combined loan correctly', () => {
            const data = {
                commercial: {
                    amount: 100000,
                    term: 20,
                    rate: 5.0
                },
                housingFund: {
                    amount: 50000,
                    term: 20,
                    rate: 3.25
                },
                type: 'repayment',
                isAdvanced: false,
                extraData: { active: false },
                viewMonth: 1
            };

            const result = calculator.calculate(data);

            expect(result.commercial).toBeDefined();
            expect(result.housingFund).toBeDefined();
            expect(result.total).toBeDefined();

            expect(result.total.current.monthlyPayment).toBeGreaterThan(0);
            expect(result.total.current.totalRepayment).toBeGreaterThan(0);
            expect(result.total.current.totalInterest).toBeGreaterThan(0);

            expect(result.total.current.monthlyPayment).toBeCloseTo(
                result.commercial.current.monthlyPayment +
                    result.housingFund.current.monthlyPayment,
                2
            );
        });

        it('should handle different loan terms', () => {
            const data = {
                commercial: {
                    amount: 100000,
                    term: 30,
                    rate: 5.0
                },
                housingFund: {
                    amount: 50000,
                    term: 20,
                    rate: 3.25
                },
                type: 'repayment',
                isAdvanced: false,
                extraData: { active: false },
                viewMonth: 1
            };

            const result = calculator.calculate(data);

            expect(result.total.current.monthlyPayment).toBeGreaterThan(0);
        });

        it('should work with decreasing payment type', () => {
            const data = {
                commercial: {
                    amount: 100000,
                    term: 20,
                    rate: 5.0
                },
                housingFund: {
                    amount: 50000,
                    term: 20,
                    rate: 3.25
                },
                type: 'decreasing',
                isAdvanced: false,
                extraData: { active: false },
                viewMonth: 1
            };

            const result = calculator.calculate(data);

            expect(result.total.current.monthlyPayment).toBeGreaterThan(0);
            expect(result.commercial.current.monthlyPayment).toBeGreaterThan(
                result.housingFund.current.monthlyPayment
            );
        });

        it('should work with interest-only type', () => {
            const data = {
                commercial: {
                    amount: 100000,
                    term: 20,
                    rate: 5.0
                },
                housingFund: {
                    amount: 50000,
                    term: 20,
                    rate: 3.25
                },
                type: 'interest-only',
                isAdvanced: false,
                extraData: { active: false },
                viewMonth: 1
            };

            const result = calculator.calculate(data);

            expect(result.total.current.monthlyPayment).toBeGreaterThan(0);
        });

        it('should calculate early repayment savings correctly', () => {
            const data = {
                commercial: {
                    amount: 100000,
                    term: 20,
                    rate: 5.0
                },
                housingFund: {
                    amount: 50000,
                    term: 20,
                    rate: 3.25
                },
                type: 'repayment',
                isAdvanced: true,
                extraData: {
                    active: true,
                    mode: 'lump-sum',
                    commercialLumpAmount: 20000,
                    housingFundLumpAmount: 10000,
                    lumpMonth: 12,
                    lumpStrategy: 'reduce-term'
                },
                viewMonth: 1
            };

            const result = calculator.calculate(data);

            // 提前还款后应该有节省
            expect(result.total.current.totalInterest).toBeLessThan(
                result.total.normal.totalInterest
            );
            // normal 和 current 应该不同
            expect(result.total.normal.totalRepayment).not.toBe(
                result.total.current.totalRepayment
            );
        });
    });

    describe('getAmortizationSlice', () => {
        it('should return combined amortization data', () => {
            const commercial = {
                amount: 100000,
                term: 20,
                rate: 5.0
            };
            const housingFund = {
                amount: 50000,
                term: 20,
                rate: 3.25
            };

            const slice = calculator.getAmortizationSlice(
                commercial,
                housingFund,
                'repayment',
                1,
                5
            );

            expect(slice).toHaveLength(5);
            expect(slice[0].principal).toBeGreaterThan(0);
            expect(slice[0].interest).toBeGreaterThan(0);
            expect(slice[0].total).toBeCloseTo(slice[0].principal + slice[0].interest, 2);
        });
    });

    describe('getRemainingBalance', () => {
        it('should return combined remaining balance', () => {
            const commercial = {
                amount: 100000,
                term: 20,
                rate: 5.0
            };
            const housingFund = {
                amount: 50000,
                term: 20,
                rate: 3.25
            };

            const balance = calculator.getRemainingBalance(
                commercial,
                housingFund,
                'repayment',
                120
            );

            expect(balance).toBeGreaterThan(0);
            expect(balance).toBeLessThan(commercial.amount + housingFund.amount);
        });
    });
});
