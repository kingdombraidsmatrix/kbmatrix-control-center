import type { StylistsOverview } from '@/types';
import { useHttpQueryService } from '@/services/http';

export function useGetStylistsOverview() {
  return useHttpQueryService<StylistsOverview>({
    url: '/api/v1/analytics/stylists',
    queryKey: ['stylists', 'overview'],
  });
}
