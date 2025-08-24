import type { LoginRequest, LoginResponse } from '@/types/auth.types.ts';
import { useHttpService } from '@/services/http/use-http-service.ts';

export function useAuthService() {
  return useHttpService<LoginRequest, LoginResponse>({
    url: '/api/v1/auth/login',
    method: 'POST',
  });
}
