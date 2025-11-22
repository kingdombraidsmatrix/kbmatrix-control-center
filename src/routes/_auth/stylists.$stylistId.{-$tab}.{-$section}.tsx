import { createFileRoute } from '@tanstack/react-router';
import { StylistOverviewPage } from '@/app/stylist-overview';

export const Route = createFileRoute('/_auth/stylists/$stylistId/{-$tab}/{-$section}')({
  component: StylistOverviewPage,
});
