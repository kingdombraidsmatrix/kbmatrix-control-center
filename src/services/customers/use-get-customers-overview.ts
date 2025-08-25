import type { UsersOverview } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetCustomersOverview() {
  return useHttpQueryService<UsersOverview>({
    url: '/api/v1/analytics/users',
    queryKey: ['users', 'overview'],
  });
}
