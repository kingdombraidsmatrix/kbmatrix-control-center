import type { Plan } from '@/types/plans.ts';
import { useHttpMutationService } from '@/services/http';

export function useTogglePlanActivation(planId: number) {
  return useHttpMutationService<boolean, Plan>(
    {
      url: `/api/v1/plan/${planId}/activate`,
      method: 'POST',
    },
    { headers: { 'Content-Type': 'application/json' } },
  );
}
