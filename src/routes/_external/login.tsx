import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { zodValidator } from '@tanstack/zod-adapter';
import { LoginPage } from '@/app/login';

const searchParamSchema = z.object({
  from: z.string().optional(),
});

export const Route = createFileRoute('/_external/login')({
  component: RouteComponent,
  validateSearch: zodValidator(searchParamSchema),
});

function RouteComponent() {
  return <LoginPage />;
}
