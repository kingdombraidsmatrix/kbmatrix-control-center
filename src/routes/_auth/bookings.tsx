import { createFileRoute } from '@tanstack/react-router';
import { BookingsPage } from '@/app/bookings/bookings-page.tsx';

export const Route = createFileRoute('/_auth/bookings')({
  component: BookingsPage,
});
