import type { PermissionGroup } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetPermissionsService() {
  return useHttpQueryService<Array<PermissionGroup>>({
    url: '/api/v1/user/admin/permissions',
    queryKey: ['permissions'],
  });
}
