import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoanCalculator } from './loan-calculator';

// Мокаем хранилище
vi.mock('../model/use-loan-calculator', () => ({
  useLoanCalculator: () => ({
    loanAmount: 100000,
    term: 12,
    interestRate: 10,
    monthlyPayment: 8791.59,
    totalAmount: 105499.08,
    setLoanAmount: vi.fn(),
    setTerm: vi.fn(),
    setInterestRate: vi.fn(),
    calculatePayment: vi.fn(),
    reset: vi.fn(),
  }),
}));

describe('LoanCalculator', () => {
  it('renders calculator with initial values', () => {
    render(<LoanCalculator />);

    expect(screen.getByLabelText(/Сумма кредита/i)).toHaveValue(100000);
    expect(screen.getByLabelText(/Срок \(месяцев\)/i)).toHaveValue(12);
    expect(screen.getByLabelText(/Процентная ставка/i)).toHaveValue(10);
  });

  it('displays calculation results', () => {
    render(<LoanCalculator />);

    expect(screen.getByText(/Ежемесячный платеж:/i)).toBeInTheDocument();
    expect(screen.getByText('8,791.59 ₽')).toBeInTheDocument();
    expect(screen.getByText(/Общая сумма выплат:/i)).toBeInTheDocument();
    expect(screen.getByText('105,499.08 ₽')).toBeInTheDocument();
  });
});
