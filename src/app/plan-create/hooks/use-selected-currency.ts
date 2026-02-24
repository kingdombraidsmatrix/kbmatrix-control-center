import { useMemo } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type { PlanRequest } from '@/types/plans.ts';
import { useGetCountries, useGetCurrencies } from '@/services/geo';

export function useSelectedCurrency(form: UseFormReturn<PlanRequest>, currencyCode?: string) {
  const { watch } = form;
  const selectedCountry = watch('countryCode');

  const { data, isLoading } = useGetCountries({ enabled: !!selectedCountry });

  const selectedCurrency = useMemo(
    () => data?.content.find((c) => c.code === selectedCountry)?.currency,
    [data, selectedCountry],
  );

  const { data: currencies, isLoading: isLoadingCurrencies } = useGetCurrencies({
    enabled: !!currencyCode && !selectedCountry,
  });

  const currency = useMemo(
    () => currencies?.content.find((c) => c.code === currencyCode),
    [currencies, currencyCode],
  );

  return {
    selectedCurrency: selectedCurrency || currency,
    isLoading: isLoading || isLoadingCurrencies,
  };
}
