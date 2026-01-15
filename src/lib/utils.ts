import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { toast } from 'sonner';
import type { ClassValue } from 'clsx';
import type { UseFormReturn } from 'react-hook-form';
import type { SortingState } from '@tanstack/react-table';

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

export function formatMoney(amount: number, currency: string) {
  const formatNumber = Intl.NumberFormat('en-US', {
    notation: 'standard',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
  return `${currency} ${formatNumber}`;
}

export function formatDate(date: Date | string) {
  return format(new Date(date), 'dd MMM. yy, hh:mm:ss a');
}

export function formatDateISO(date: Date | string) {
  return format(new Date(date), 'yyyy-MM-dd');
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

export function transformSorting(sorting: SortingState) {
  return sorting.map((item) => `${item.id},${item.desc ? 'DESC' : 'ASC'}`).join(',');
}

export function extractInitials(name: string = 'User') {
  return name
    .split(/\s+/)
    .map((item) => item.trim()[0])
    .filter(Boolean)
    .join('')
    .toUpperCase();
}

export function getBackgroundTint(input: string): string {
  let hash = 0;

  for (let i = 0; i < input.length; i++) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0; // unsigned 32-bit
  }

  const index = hash % 10;

  const colors = [
    'bg-emerald-500',
    'bg-amber-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-indigo-500',
    'bg-fuchsia-400',
    'bg-blue-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-lime-500',
  ];

  return colors[index];
}
