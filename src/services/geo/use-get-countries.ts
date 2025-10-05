import type { Page } from '@/types';
import type { Country } from '@/types/geo.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetCountriesFilter {
  allowNewSignup?: boolean;
  page?: number;
  size?: number;
  sort?: string;
}
export function useGetCountries(filter: UseGetCountriesFilter = {}) {
  return useHttpQueryService<Page<Country>>({
    url: '/api/v1/geo/country',
    params: filter,
    queryKey: ['countries', filter],
  });
}
