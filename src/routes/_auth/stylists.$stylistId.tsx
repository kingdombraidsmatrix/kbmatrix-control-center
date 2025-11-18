import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { StylistOverviewPage } from '@/app/stylist-overview';
import { StylistOverviewTab } from '@/types';

export const Route = createFileRoute('/_auth/stylists/$stylistId')({
  component: StylistOverviewPage,
  validateSearch: z.object({
    tab: z.nativeEnum(StylistOverviewTab).default(StylistOverviewTab.DETAILS).optional(),
  }),
});
