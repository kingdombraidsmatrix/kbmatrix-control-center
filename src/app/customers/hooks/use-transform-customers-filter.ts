import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { CustomersFilter, UserStatus } from '@/types';
import { useDebounce } from '@/hooks/use-debounce.ts';

export function useTransformCustomersFilter(filters: ColumnFiltersState) {
  // Debounce only the text search filter so select changes (status) apply instantly.
  const nameFilter = filters.find((f) => f.id === 'name');
  const debouncedName = useDebounce(nameFilter?.value as string | undefined, 300);

  return useMemo(() => {
    const mappedFilters: Partial<CustomersFilter> = {};

    if (debouncedName) {
      mappedFilters.search = debouncedName;
    }

    const statusFilter = filters.find((f) => f.id === 'status');
    if (statusFilter && statusFilter.value) {
      mappedFilters.status = statusFilter.value as UserStatus;
    }

    return mappedFilters;
  }, [debouncedName, filters]);
}
