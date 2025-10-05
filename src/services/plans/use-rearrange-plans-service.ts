import type { Plan } from '@/types/plans.ts';
import { useHttpMutationService } from '@/services/http';

export function useRearrangePlansService() {
  return useHttpMutationService<Array<number>, Array<Plan>>({
    url: '/api/v1/plan/re-arrange',
    method: 'POST',
  });
}
