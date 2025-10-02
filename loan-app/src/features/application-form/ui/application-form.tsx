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
  const { addApplication, isLoading, error, clearError } = useApplicationStore();
  const { loanAmount, term, interestRate, monthlyPayment, totalAmount } = useLoanCalculator();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: yupResolver(schema),
  });

  const phoneValue = watch('phone');

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
  }, [imaskValue, setValue, phoneValue]);

  // Инициализация значения телефона при монтировании
  useEffect(() => {
    if (phoneValue) {
      setImaskValue(phoneValue);
    }
  }, []);

  const onSubmit = async (data: ApplicationFormData) => {
    clearError();

    try {
      addApplication({
        ...data,
        phone: data.phone.replace(/\D/g, ''),
        loanAmount,
        term,
        interestRate,
        monthlyPayment: monthlyPayment || 0,
        totalAmount: totalAmount || 0,
      });
      alert('Заявка отправлена!');
    } catch (err) {
      console.error('Failed to submit application:', err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Оформление заявки</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО</Label>
            <Input
              id="fullName"
              {...register('fullName', { onChange: () => trigger('fullName') })}
              aria-invalid={errors.fullName ? 'true' : 'false'}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email', { onChange: () => trigger('email') })}
              //aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              {...register('phone', {
                onChange: (e) => {
                  setImaskValue(e.target.value);
                },
                onBlur: () => trigger('phone'),
              })}
              ref={(element) => {
                // Правильное связывание IMask ref
                if (element) {
                  imaskRef.current = element;
                }
              }}
              value={imaskValue}
              //aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
