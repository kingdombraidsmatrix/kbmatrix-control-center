import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from '@/app/dashboard'

export const Route = createFileRoute('/_auth/')({
  component: DashboardPage,
});
