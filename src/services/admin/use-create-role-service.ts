import type { CreateRoleRequest, Role } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useCreateRoleService() {
  return useHttpMutationService<CreateRoleRequest, Role>({
    url: '/api/v1/admin/role',
    method: 'POST',
  });
}
