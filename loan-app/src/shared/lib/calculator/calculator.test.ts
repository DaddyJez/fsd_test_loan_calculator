import { describe, it, expect } from 'vitest';
import { calculateLoan } from './calculator';
import '@testing-library/jest-dom';

describe('calculateLoan', () => {
  it('should calculate monthly payment correctly', () => {
    const result = calculateLoan(100000, 12, 10);

    expect(result.monthlyPayment).toBeCloseTo(8792, 0);
    expect(result.totalAmount).toBeCloseTo(105499, 0);
  });

  it('should return 0 for zero loan amount', () => {
    const result = calculateLoan(0, 12, 10);

    expect(result.monthlyPayment).toBe(0);
    expect(result.totalAmount).toBe(0);
  });

  it('should handle different terms correctly', () => {
    const result1 = calculateLoan(100000, 12, 10);
    const result2 = calculateLoan(100000, 24, 10);

    // Более длинный срок = меньший ежемесячный платеж
    expect(result2.monthlyPayment).toBeLessThan(result1.monthlyPayment);
    // Но большая общая сумма выплат из-за процентов
    expect(result2.totalAmount).toBeGreaterThan(result1.totalAmount);
  });
});
