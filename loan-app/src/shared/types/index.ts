export interface LoanApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  loanAmount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number;
  totalAmount: number;
  createdAt: Date;
}

export interface CalculatorState {
  loanAmount: number;
  term: number;
  interestRate: number;
  monthlyPayment: number | null;
  totalAmount: number | null;
}

export type LoanApplicationFormData = Omit<
  LoanApplication,
  'id' | 'createdAt' | 'monthlyPayment' | 'totalAmount'
>;
