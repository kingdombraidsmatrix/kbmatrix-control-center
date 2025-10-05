import type { Plan } from '@/types/plans.ts';
import { useHttpQueryService } from '@/services/http';

export function useGetPlanService(id?: number) {
  return useHttpQueryService<Plan>({
    url: `/api/v1/plan/${id}`,
    queryKey: ['plan', id],
    enabled: !!id,
  });
}
