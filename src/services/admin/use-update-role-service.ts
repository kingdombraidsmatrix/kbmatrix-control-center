import type { Role, UpdateRoleRequest } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useUpdateRoleService() {
  return useHttpMutationService<UpdateRoleRequest, Role>({
    url: '/api/v1/admin/role',
    method: 'PUT',
  });
}
