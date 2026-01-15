import { useHttpMutationService } from '@/services/http';

export function useDeleteAdminService(id: number) {
  return useHttpMutationService<void, string>({
    url: `/api/v1/user/admin/${id}`,
    method: 'DELETE',
  });
}
