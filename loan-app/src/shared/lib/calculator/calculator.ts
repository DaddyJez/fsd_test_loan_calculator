export interface LoanCalculation {
  monthlyPayment: number;
  totalAmount: number;
}

export function calculateLoan(
  loanAmount: number,
  term: number,
  interestRate: number
): LoanCalculation {
  // Формула аннуитетного платежа
  const monthlyRate = interestRate / 100 / 12;
  const payment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);
  const total = payment * term;

  return {
    monthlyPayment: Math.round(payment),
    totalAmount: Math.round(total),
  };
}
