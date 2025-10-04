import { createFileRoute } from '@tanstack/react-router';
import { PlanCreatePage } from '@/app/plan-create';

export const Route = createFileRoute('/_auth/settings/plans/$countryCode')({
  component: PlanCreatePage,
});
