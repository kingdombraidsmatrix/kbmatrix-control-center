import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { StylistStatus, StylistsFilter } from '@/types';
import { useDebounce } from '@/hooks/use-debounce.ts';

export function useTransformStylistsFilter(filters: ColumnFiltersState) {
  const debouncedFilters = useDebounce(filters);

  return useMemo(() => {
    const mappedFilters: Partial<StylistsFilter> = {};

    for (const filter of debouncedFilters) {
      switch (filter.id) {
        case 'name':
          mappedFilters.search = filter.value as string;
          break;

        case 'status':
          mappedFilters.status = filter.value as StylistStatus;
          break;
      }
    }

    return mappedFilters;
  }, [debouncedFilters]);
}
