import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { ClassValue } from 'clsx';
import type { UseFormReturn } from 'react-hook-form';

export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number | string) {
  return Intl.NumberFormat('en-US', {
    notation: 'compact',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(Number(value));
}

export function formatDate(date: Date | string) {
  return format(new Date(date), 'dd MMM. yy, hh:mm:ss a');
}

export function handleHttpError(error: any, form?: UseFormReturn<any>) {
  if (error?.response?.data?.message) {
    if (!!form && Object.keys(error.response.data?.errors).length) {
      Object.entries(error.response.data?.errors as Record<string, string>).forEach(
        ([key, value]) => {
          form.setError(key, { message: value, type: 'value' });
        },
      );
    }
    toast.error(error?.response?.data?.message);
    return;
  }

  toast.error('Something went wrong');
}
