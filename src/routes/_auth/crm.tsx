import { createFileRoute } from '@tanstack/react-router';
import { CrmPage } from '@/app/crm/crm-page.tsx';

export const Route = createFileRoute('/_auth/crm')({
  component: CrmPage,
});
