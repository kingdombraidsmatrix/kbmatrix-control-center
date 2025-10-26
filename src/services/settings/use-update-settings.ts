import { useQueryClient } from '@tanstack/react-query';
import type { Settings, UpdateSettingsRequest } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useHttpMutationService<UpdateSettingsRequest, Settings>({
    url: '/api/v1/settings',
    method: 'PUT',
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
  });
}
