import type { InputHTMLAttributes } from 'react';

export interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
}

export interface CalculatorState {
  loanAmount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number | null;
  totalAmount: number | null;
}

export interface LoanApplication extends Omit<CalculatorState, 'monthlyPayment' | 'totalAmount'> {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  monthlyPayment: number;
  totalAmount: number;
  createdAt: Date;
}

export type LoanApplicationFormData = Omit<
  LoanApplication,
  'id' | 'createdAt' | 'monthlyPayment' | 'totalAmount'
>;
