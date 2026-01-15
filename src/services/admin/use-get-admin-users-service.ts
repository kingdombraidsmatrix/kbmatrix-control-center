import type { AdminUser, Page } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface AdminUseGetAdminUsersServiceProps {
  page: number;
  size: number;
}
export function useGetAdminUsersService(params: AdminUseGetAdminUsersServiceProps) {
  return useHttpQueryService<Page<AdminUser>>({
    url: '/api/v1/user/admin',
    queryKey: ['admin', 'users', params],
    params,
  });
}
