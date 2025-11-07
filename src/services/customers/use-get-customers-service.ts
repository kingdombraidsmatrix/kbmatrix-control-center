import type { Page } from '@/types/common.types.ts';
import type { User, UserStatus } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface UseGetCustomersServiceParams {
  page?: number;
  size?: number;
  sort?: string;
  userStatus?: Array<UserStatus>;
}
export function useGetCustomersService(params: UseGetCustomersServiceParams) {
  return useHttpQueryService<Page<User>>({
    url: '/api/v1/user',
    queryKey: ['users', params],
    params,
  });
}
