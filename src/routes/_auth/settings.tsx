import { createFileRoute } from '@tanstack/react-router';
import { SettingsPage } from '@/app/settings';

export const Route = createFileRoute('/_auth/settings')({
  component: SettingsPage,
});
