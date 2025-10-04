import type { Feature } from '@/types/plans.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetFeatures() {
  return useHttpQueryService<Array<Feature>>({
    url: '/api/v1/plan/features',
    queryKey: ['plans', 'features'],
  });
}
