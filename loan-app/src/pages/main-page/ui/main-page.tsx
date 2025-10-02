// pages/main-page/ui/main-page.tsx
import { LoanCalculator } from '@/features/loan-calculator';
import { ApplicationForm } from '@/features/application-form';
import { ApplicationList } from '@/entities/application';
import { useApplicationStore } from '@/entities/application';

export const MainPage = () => {
  const clearError = useApplicationStore().clearError;
  const error = useApplicationStore().error;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Кредитный калькулятор</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
          <button className="absolute top-0 right-0 p-2" onClick={clearError}>
            ×
          </button>
        </div>
      )}

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
