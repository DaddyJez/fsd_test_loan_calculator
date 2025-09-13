import { LoanCalculator } from '@/features/loan-calculator';

export const MainPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Кредитный калькулятор</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <LoanCalculator />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Оформите заявку</h2>
          <p className="text-gray-600">Здесь будет форма</p>
        </div>
      </div>
    </div>
  );
};
