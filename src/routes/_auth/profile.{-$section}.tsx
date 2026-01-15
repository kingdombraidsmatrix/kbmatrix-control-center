import { createFileRoute } from '@tanstack/react-router';
import { ProfilePage } from '@/app/profile';

export const Route = createFileRoute('/_auth/profile/{-$section}')({
  component: ProfilePage,
});
