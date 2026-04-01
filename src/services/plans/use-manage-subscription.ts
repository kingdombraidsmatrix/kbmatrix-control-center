import { useQueryClient } from '@tanstack/react-query';
import type { ManageSubscriptionRequest, Subscription } from '@/types/plans.ts';
import { useHttpMutationService } from '@/services/http';

export function useManageSubscription() {
  const queryClient = useQueryClient();

  return useHttpMutationService<ManageSubscriptionRequest, Subscription>({
    url: '/api/v1/subscriptions/admin/manage',
    method: 'POST',
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['subscription', 'current', variables.stylistId],
      });
      await queryClient.invalidateQueries({
        queryKey: ['subscriptions'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['transactions'],
      });
    },
  });
}
