import { useApplicationStore } from '../model/use-application-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';

export const ApplicationList = () => {
  const applications = useApplicationStore().applications;

  if (applications.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Заявки</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Пока нет отправленных заявок</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Заявки ({applications.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="border rounded-lg p-4">
              <div className="flex justify-between">
                <h3 className="font-semibold">{app.fullName}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-600">{app.email}</p>
              <p className="text-gray-600">{app.phone}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Сумма: {app.loanAmount.toLocaleString()} ₽</div>
                <div>Срок: {app.term} мес.</div>
                <div>Ставка: {app.interestRate}%</div>
                <div>Платеж: {app.monthlyPayment.toLocaleString()} ₽/мес</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
