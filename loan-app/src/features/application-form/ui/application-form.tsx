import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplicationStore } from '@/entities/application';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useLoanCalculator } from '@/features/loan-calculator';

const schema = yup.object({
  fullName: yup.string().required('Обязательное поле'),
  email: yup.string().email('Неверный email').required('Обязательное поле'),
  phone: yup.string().required('Обязательное поле'),
});

export const ApplicationForm = () => {
  const { addApplication } = useApplicationStore();
  const { loanAmount, term, interestRate, monthlyPayment, totalAmount } = useLoanCalculator();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    addApplication({
      ...data,
      loanAmount,
      term,
      interestRate,
      monthlyPayment: monthlyPayment || 0,
      totalAmount: totalAmount || 0,
    });
    alert('Заявка отправлена!');
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Оформление заявки</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО</Label>
            <Input
              id="fullName"
              {...register('fullName')}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              {...register('phone')}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            Отправить заявку
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
