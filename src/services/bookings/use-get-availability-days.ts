import type { AvailabilityDay, AvailabilityDaysFilter } from '@/types/bookings.types.ts';
import { useHttpQueryService } from '@/services/http';

type TransformedAvailability = Record<string, AvailabilityDay>;

export function useGetAvailabilityDays(params: AvailabilityDaysFilter) {
  return useHttpQueryService<
    Array<AvailabilityDay>,
    AvailabilityDaysFilter,
    TransformedAvailability
  >({
    url: `/api/v1/availability/${params.stylistId}/days`,
    queryKey: ['stylist', 'bookings', 'availability', params],
    params,
    select: (data) =>
      data.reduce<TransformedAvailability>((agg, curr) => {
        agg[curr.date] = curr;
        return agg;
      }, {}),
  });
}
