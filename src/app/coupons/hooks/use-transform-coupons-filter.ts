import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { UseGetCouponsServiceParams } from '@/services/coupons';
import { useDebounce } from '@/hooks/use-debounce.ts';

export function useTransformCouponsFilter(filters: ColumnFiltersState) {
  const debouncedFilter = useDebounce(filters);

  return useMemo(() => {
    const mappedFilters: Partial<UseGetCouponsServiceParams> = {};

    for (const filter of debouncedFilter) {
      switch (filter.id) {
        case 'name':
          mappedFilters.search = filter.value as string;
          break;
      }
    }

    return mappedFilters;
  }, [debouncedFilter]);
}
