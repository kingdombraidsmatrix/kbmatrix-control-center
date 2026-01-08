import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { BookingStatus, BookingsFilter } from '@/types/bookings.types.ts';
import { useDebounce } from '@/hooks/use-debounce.ts';

export function useTransformBookingsFilter(filters: ColumnFiltersState) {
  const debouncedFilter = useDebounce(filters);

  return useMemo(() => {
    const mappedFilters: Partial<BookingsFilter> = {};

    for (const filter of debouncedFilter) {
      switch (filter.id) {
        case 'status':
          mappedFilters.statuses = Array.from(filter.value as Set<BookingStatus>);
          break;
      }
    }

    return mappedFilters;
  }, [debouncedFilter]);
}
