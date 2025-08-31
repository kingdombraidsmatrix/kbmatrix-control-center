import { createFileRoute } from '@tanstack/react-router';
import { PlansPage } from '@/app/plans';

export const Route = createFileRoute('/_auth/settings/plans')({
  component: PlansPage,
});
