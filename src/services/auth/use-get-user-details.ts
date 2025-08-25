import type { User } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetUserDetails() {
  return useHttpQueryService<User>({
    url: '/api/v1/user/user-details',
    queryKey: ['userDetails'],
  });
}
