import type { Subscription } from '@/types/plans.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetCurrentSubscription(stylistId: number) {
  return useHttpQueryService<Subscription>({
    url: '/api/v1/subscriptions/current',
    queryKey: ['subscription', 'current', stylistId],
    params: { stylistId },
    retry: 0,
  });
}
