import { IMaskInput } from 'react-imask';
import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { Input } from '@/shared/ui/input';

interface PhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onPhoneAccept: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ onPhoneAccept, ...props }, ref) => {
    return (
      <IMaskInput
        mask="+7 (000) 000-00-00"
        inputRef={ref}
        onAccept={(value: string) => onPhoneAccept(value)}
        {...props}
      ></IMaskInput>
    );
  }
);

PhoneInput.displayName = 'PhoneInput';
