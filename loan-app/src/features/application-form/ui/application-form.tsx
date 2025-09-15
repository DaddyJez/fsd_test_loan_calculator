import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useApplicationStore } from '@/entities/application';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { useLoanCalculator } from '@/features/loan-calculator';
import type { ApplicationFormData } from '@/shared/types';
import { useIMask } from 'react-imask';
import { useEffect, useRef } from 'react';

const schema = yup.object({
  fullName: yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
  email: yup.string().email('Неверный email').required('Обязательное поле'),
  phone: yup
    .string()
    .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона')
    .required('Обязательное поле'),
});

export const ApplicationForm = () => {
  const { addApplication } = useApplicationStore();
  const { loanAmount, term, interestRate, monthlyPayment, totalAmount } = useLoanCalculator();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(schema),
  });

  const phoneValue = watch('phone');
  const isInitialRender = useRef(true);
  const previousPhoneValue = useRef<string>();

  const {
    ref: imaskRef,
    value: imaskValue,
    setValue: setImaskValue,
  } = useIMask({
    mask: '+7 (000) 000-00-00',
  });

  // Синхронизация из IMask в react-hook-form
  useEffect(() => {
    if (imaskValue && imaskValue !== phoneValue) {
      setValue('phone', imaskValue, { shouldValidate: true });
    }
    console.log('rep');
  }, [imaskValue, setValue]); // Убрали phoneValue из зависимостей

  // Синхронизация из react-hook-form в IMask (только при внешних изменениях)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      if (phoneValue) {
        setImaskValue(phoneValue);
      }
      return;
    }

    // Обновляем IMask только если значение изменилось не через сам IMask
    if (phoneValue && phoneValue !== imaskValue && phoneValue !== previousPhoneValue.current) {
      setImaskValue(phoneValue);
    }

    previousPhoneValue.current = phoneValue;
  }, [phoneValue, imaskValue, setImaskValue]);

  const onSubmit = (data: ApplicationFormData) => {
    const cleanedPhone = data.phone.replace(/\D/g, '');

    addApplication({
      ...data,
      phone: cleanedPhone,
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
            <Input id="fullName" {...register('fullName')} />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              ref={imaskRef}
              value={imaskValue}
              onChange={(e) => {
                // IMask автоматически обработает изменение через mask
                setImaskValue(e.target.value);
              }}
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
