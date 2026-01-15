import type { AdminUser, UpdateAdminRequest } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useUpdateAdminService() {
  return useHttpMutationService<UpdateAdminRequest, AdminUser>({
    url: '/api/v1/user/admin',
    method: 'PUT',
  });
}
