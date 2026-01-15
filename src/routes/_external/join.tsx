import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-adapter';
import { JoinPage } from '@/app/join/join-page.tsx';

const searchParamSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export const Route = createFileRoute('/_external/join')({
  component: JoinPage,
  validateSearch: zodValidator(searchParamSchema),
});
