import { useEffect } from 'react';
import { useLoanCalculator } from '../model/use-loan-calculator';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export const LoanCalculator = () => {
  const {
    loanAmount,
    term,
    interestRate,
    monthlyPayment,
    totalAmount,
    setLoanAmount,
    setTerm,
    setInterestRate,
    calculatePayment,
    reset,
  } = useLoanCalculator();

  useEffect(() => {
    calculatePayment();
  }, [loanAmount, term, interestRate, calculatePayment]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Кредитный калькулятор</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="loanAmount">Сумма кредита</Label>
          <Input
            id="loanAmount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            min="1000"
            max="10000000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="term">Срок (месяцев)</Label>
          <Input
            id="term"
            type="number"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            min="1"
            max="360"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="interestRate">Процентная ставка (%)</Label>
          <Input
            id="interestRate"
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            min="1"
            max="100"
            step="0.1"
          />
        </div>

        {monthlyPayment && totalAmount && (
          <div className="space-y-2 p-4 bg-muted rounded-lg">
            <div className="flex justify-between">
              <span>Ежемесячный платеж:</span>
              <span className="font-bold">{monthlyPayment.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Общая сумма выплат:</span>
              <span className="font-bold">{totalAmount.toLocaleString()} ₽</span>
            </div>
            <div className="flex justify-between">
              <span>Переплата:</span>
              <span className="font-bold">{(totalAmount - loanAmount).toLocaleString()} ₽</span>
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <Button onClick={calculatePayment} className="flex-1">
            Рассчитать
          </Button>
          <Button variant="outline" onClick={reset}>
            Сбросить
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
