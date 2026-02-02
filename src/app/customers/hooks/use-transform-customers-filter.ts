import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { CustomersFilter, UserStatus } from '@/types';
import { useDebounce } from '@/hooks/use-debounce.ts';

export function useTransformCustomersFilter(filters: ColumnFiltersState) {
  const debouncedFilters = useDebounce(filters);

  return useMemo(() => {
    const mappedFilters: Partial<CustomersFilter> = {};

    for (const filter of debouncedFilters) {
      switch (filter.id) {case 'status':
          mappedFilters.userStatus = Array.from(filter.value as Set<UserStatus>);
          break;
      }
    }

    return mappedFilters;
  }, [debouncedFilters]);
}
