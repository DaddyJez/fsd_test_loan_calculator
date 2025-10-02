import { create } from 'zustand';
import { calculateLoan } from '@/shared/lib/calculator/calculator';
import type { CalculatorState } from '@/shared/types';

interface LoanCalculatorStore extends CalculatorState {
  setLoanAmount: (amount: number) => void;
  setTerm: (term: number) => void;
  setInterestRate: (rate: number) => void;
  calculatePayment: () => void;
  reset: () => void;
}

export const useLoanCalculator = create<LoanCalculatorStore>((set, get) => ({
  loanAmount: 100000,
  term: 12,
  interestRate: 10,
  monthlyPayment: null,
  totalAmount: null,

  setLoanAmount: (amount: number) => set({ loanAmount: amount }),
  setTerm: (term: number) => set({ term }),
  setInterestRate: (rate: number) => set({ interestRate: rate }),

  calculatePayment: () => {
    const state = get();
    const { loanAmount, term, interestRate } = state;

    // Используем функцию расчета из lib
    const { monthlyPayment, totalAmount } = calculateLoan(loanAmount, term, interestRate);

    set({
      monthlyPayment,
      totalAmount,
    });
  },

  reset: () =>
    set({
      loanAmount: 100000,
      term: 12,
      interestRate: 10,
      monthlyPayment: null,
      totalAmount: null,
    }),
}));
