import type { LoginRequest, LoginResponse } from '@/types/auth.types.ts';
import { useHttpMutationService } from '@/services/http';

export function useAuthService() {
  return useHttpMutationService<LoginRequest, LoginResponse>({
    url: '/api/v1/auth/login',
    method: 'POST',
  });
}
