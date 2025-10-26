import type { Booking, BookingsFilter } from '@/types/bookings.types';
import type { Page } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetBookings(params: Partial<BookingsFilter> = {}) {
  return useHttpQueryService<Page<Booking>, Partial<BookingsFilter>>({
    url: '/api/v1/booking',
    queryKey: ['bookings', params],
    params,
  });
}
