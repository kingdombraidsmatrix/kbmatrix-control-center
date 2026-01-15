import type { JoinAdminRequest, LoginResponse } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useSignupService() {
  return useHttpMutationService<JoinAdminRequest, LoginResponse>({
    url: '/api/v1/user/admin/accept',
    method: 'POST',
  });
}
