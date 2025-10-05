import type { Plan } from '@/types/plans.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetPlansService() {
  return useHttpQueryService<Array<Plan>>({
    url: '/api/v1/plan',
    queryKey: ['plans'],
    params: {
      sort: ['position,asc'],
    },
  });
}
