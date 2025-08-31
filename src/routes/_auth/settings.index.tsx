import { createFileRoute } from '@tanstack/react-router';
import { EmptySettingsPage } from '@/app/settings';

export const Route = createFileRoute('/_auth/settings/')({
  component: EmptySettingsPage,
});
