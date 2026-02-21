import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { StylistsPage } from '@/app/stylists';
import { StylistStatus } from '@/types';

export const Route = createFileRoute('/_auth/stylists/')({
  component: StylistsPage,
  validateSearch: z.object({
    filter: z
      .object({
        status: z.nativeEnum(StylistStatus).optional(),
        name: z.string().optional(),
      })
      .optional(),
  }),
});
