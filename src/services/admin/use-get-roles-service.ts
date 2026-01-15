import type { Page, Role } from '@/types';
import { useHttpQueryService } from '@/services/http';

interface UseGetRolesServiceProps {
  page: number;
  size: number;
}
export function useGetRolesService(params: UseGetRolesServiceProps) {
  return useHttpQueryService<Page<Role>>({
    url: '/api/v1/admin/role',
    queryKey: ['roles', params],
    params: { ...params, sort: 'id,desc' },
  });
}
