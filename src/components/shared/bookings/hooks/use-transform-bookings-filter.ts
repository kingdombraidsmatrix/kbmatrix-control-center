import { useMemo } from 'react';
import type { ColumnFiltersState } from '@tanstack/react-table';
import type { BookingStatus, BookingsFilter } from '@/types/bookings.types.ts';
import { useDebounce } from '@/hooks/use-debounce.ts';
import {} from 'date-fns'

export function useTransformBookingsFilter(filters: ColumnFiltersState) {
  const debouncedFilter = useDebounce(filters);

  return useMemo(() => {
    const mappedFilters: Partial<BookingsFilter> = {};

    for (const filter of debouncedFilter) {
      switch (filter.id) {
        case 'status':
          mappedFilters.statuses = Array.from(filter.value as Set<BookingStatus>);
          break;

        case 'startTimeFrom':
          mappedFilters.startFrom = filter.value as Date;
          break;

        case 'startTimeTo':
          mappedFilters.startTo = filter.value as Date;
          break;

        case 'endTimeFrom':
          mappedFilters.endFrom = filter.value as Date;
          break;

        case 'endTimeTo':
          mappedFilters.endTo = filter.value as Date;
          break;

        case 'createdTimeFrom':
          mappedFilters.from = filter.value as Date;
          break;

        case 'createdTimeTo':
          mappedFilters.to = filter.value as Date;
          break;
      }
    }

    return mappedFilters;
  }, [debouncedFilter]);
}
