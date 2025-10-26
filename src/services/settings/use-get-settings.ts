import type { Settings } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetSettings() {
  return useHttpQueryService<Array<Settings>>({
    url: '/api/v1/settings',
    queryKey: ['settings'],
  });
}
