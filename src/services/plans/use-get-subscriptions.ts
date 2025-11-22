import type { Subscription } from '@/types/plans.ts';
import type { Page } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface SubscriptionFilters {
  stylistId?: number;
  page?: number;
  size?: number;
}

export function useGetSubscriptionsService(filters: SubscriptionFilters) {
  return useHttpQueryService<Page<Subscription>>({
    url: '/api/v1/subscriptions',
    queryKey: ['subscriptions', filters],
    params: {
      sort: ['createdAt,desc'],
      ...filters,
    },
  });
}
