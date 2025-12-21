import type { BookingsFilter } from '@/types/bookings.types.ts';
import { useHttpMutationService } from '@/services/http';

export function useExportBookings(filters: Partial<BookingsFilter> = {}) {
  const { mutate } = useHttpMutationService<undefined, string>(
    {
      url: '/api/v1/export/bookings',
      method: 'POST',
    },
    {
      params: filters,
    },
  );

  return { exportBookings: mutate };
}
