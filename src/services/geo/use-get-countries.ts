import type { Page } from '@/types';
import type { Country } from '@/types/geo.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetCountriesFilter {
  allowNewSignup?: boolean;
  page?: number;
  size?: number;
  sort?: string;
  enabled?: boolean;
}
export function useGetCountries({ enabled = true, ...filter }: UseGetCountriesFilter = {}) {
  return useHttpQueryService<Page<Country>>({
    url: '/api/v1/geo/country',
    params: filter,
    queryKey: ['countries', filter],
    enabled
  });
}
