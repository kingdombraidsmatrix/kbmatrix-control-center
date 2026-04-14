import { useQueryClient } from '@tanstack/react-query';
import { useHttpMutationService } from '@/services/http';

export function useDeleteCrmPushMessage() {
  const queryClient = useQueryClient();

  return useHttpMutationService<number, string>((id) => ({
    url: `/api/v1/crm/broadcast/push/${id}`,
    method: 'DELETE',
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['crmPushMessages'] });
    },
  }));
}
