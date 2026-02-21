import type { Page } from '@/types';
import type { Currency } from '@/types/geo.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetCurrenciesFilter {
  page?: number;
  size?: number;
  sort?: string;
  enabled?: boolean;
}
export function useGetCurrencies({enabled = true, ...filter }: UseGetCurrenciesFilter = {}) {
  return useHttpQueryService<Page<Currency>>({
    url: '/api/v1/geo/currency',
    params: filter,
    queryKey: ['currencies', filter],
    enabled
  });
}
