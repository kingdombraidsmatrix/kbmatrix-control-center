import type { ChangePasswordRequest } from '@/types';
import { useHttpMutationService } from '@/services/http';

export function useChangePasswordService() {
  return useHttpMutationService<ChangePasswordRequest, string>({
    url: '/api/v1/auth/change-password',
    method: 'POST',
  });
}
