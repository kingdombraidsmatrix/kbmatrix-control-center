import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { StylistOverviewPage } from '@/app/stylist-overview';

export const Route = createFileRoute('/_auth/stylists/$stylistId')({
  component: StylistOverviewPage,
  validateSearch: z.object({
    tab: z.enum(['activities', 'details']).default('details').optional(),
  }),
});
