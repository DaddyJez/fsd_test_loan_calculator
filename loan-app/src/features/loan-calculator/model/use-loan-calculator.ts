import { create } from 'zustand';
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

    // Формула аннуитетного платежа
    const monthlyRate = interestRate / 100 / 12;
    const payment =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
      (Math.pow(1 + monthlyRate, term) - 1);
    const total = payment * term;

    set({
      monthlyPayment: Math.round(payment),
      totalAmount: Math.round(total),
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
