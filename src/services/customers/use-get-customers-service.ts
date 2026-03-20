import type { Page } from '@/types/common.types.ts';
import type { User, UserStatus } from '@/types';
import { useHttpMutationService, useHttpQueryService } from '@/services/http';

interface UseGetCustomersServiceParams {
  page?: number;
  size?: number;
  sort?: string;
  userStatus?: Array<UserStatus>;
  search?: string;
}
export function useGetCustomersService(params: UseGetCustomersServiceParams) {
  return useHttpQueryService<Page<User>>({
    url: '/api/v1/user',
    queryKey: ['users', params],
    params,
  });
}

export function useGetCustomerWithMutationService() {
  return useHttpMutationService<UseGetCustomersServiceParams, Page<User>>({
    url: '/api/v1/user',
    method: 'GET',
  });
}
