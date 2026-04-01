import type { Plan } from '@/types/plans.ts';
import { useHttpQueryService } from '@/services/http';

interface UseGetPlansServiceParams {
  countryCode?: string;
}
export function useGetPlansService(params: UseGetPlansServiceParams = {}) {
  return useHttpQueryService<Array<Plan>>({
    url: '/api/v1/plan',
    queryKey: ['plans', params],
    params: {
      sort: ['position,asc'],
      ...params,
    },
  });
}
