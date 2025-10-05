import type { Plan, PlanRequest } from '@/types/plans.ts';

export function transformPlanToPlanRequest(plan: Plan): PlanRequest {
  return {
    ...plan,
    countryCode: plan.country.code,
  };
}
