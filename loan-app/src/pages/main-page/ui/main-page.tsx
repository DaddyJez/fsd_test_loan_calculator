import { LoanCalculator } from '@/features/loan-calculator';
import { ApplicationForm } from '@/features/application-form';
import { ApplicationList } from '@/entities/application';

export const MainPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Кредитный калькулятор</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <LoanCalculator />
          <ApplicationForm />
        </div>
        <div>
          <ApplicationList />
        </div>
      </div>
    </div>
  );
};
