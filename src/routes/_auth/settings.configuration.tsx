import { createFileRoute } from '@tanstack/react-router';
import { ConfigurationPage } from '@/app/configuration';

export const Route = createFileRoute('/_auth/settings/configuration')({
  component: ConfigurationPage,
});
