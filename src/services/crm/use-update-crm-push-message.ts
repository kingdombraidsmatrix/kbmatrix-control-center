import { useQueryClient } from '@tanstack/react-query';
import type { BroadcastPush, UpdateCrmPushRequest } from '@/types/crm.ts';
import { useHttpMutationService } from '@/services/http';

export function useUpdateCrmPushMessage() {
  const queryClient = useQueryClient();

  return useHttpMutationService<UpdateCrmPushRequest, BroadcastPush>({
    url: '/api/v1/crm/broadcast/push',
    method: 'PUT',
    onSuccess: async (_, data) => {
      await queryClient.invalidateQueries({ queryKey: ['crmPushMessages'] });
      await queryClient.invalidateQueries({ queryKey: ['crmPushMessage', data.id] });
    },
  });
}
