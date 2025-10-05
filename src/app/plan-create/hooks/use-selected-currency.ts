import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import { useGetCountries } from '@/services/geo';

export function useSelectedCurrency(form: UseFormReturn<PlanRequest>) {
  const { watch } = form;
  const selectedCountry = watch('countryCode');

  const { data, isLoading } = useGetCountries();

  const selectedCurrency = useMemo(
    () => data?.content.find((c) => c.code === selectedCountry)?.currency,
    [data, selectedCountry],
  );

  return { selectedCurrency, isLoading };
}
