import type { Plan, PlanRequest } from '@/types/plans.ts';
import { useHttpMutationService } from '@/services/http';

export function useUpdatePlanService() {
  return useHttpMutationService<PlanRequest, Plan>({
    url: '/api/v1/plan',
    method: 'PUT',
  });
}
