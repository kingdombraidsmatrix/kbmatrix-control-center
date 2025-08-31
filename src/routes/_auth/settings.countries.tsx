import { createFileRoute } from '@tanstack/react-router';
import { SupportedCountiesPage } from '@/app/countries';

export const Route = createFileRoute('/_auth/settings/countries')({
  component: SupportedCountiesPage,
});
