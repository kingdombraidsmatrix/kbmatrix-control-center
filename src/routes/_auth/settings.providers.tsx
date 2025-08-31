import { createFileRoute } from '@tanstack/react-router';
import { ProvidersPage } from '@/app/providers';

export const Route = createFileRoute('/_auth/settings/providers')({
  component: ProvidersPage,
});
