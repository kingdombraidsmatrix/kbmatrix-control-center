import type { User } from '@/types';
import { useHttpService } from '@/services/http/use-http-service.ts';

export function useGetUserDetails() {
  return useHttpService<unknown, User>({
    url: '/api/v1/user/user-details',
    method: 'GET',
    queryKey: ['userDetails'],
  });
}
