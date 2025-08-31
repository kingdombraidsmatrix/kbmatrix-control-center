import { createFileRoute } from '@tanstack/react-router';
import { ServiceCategoriesPage } from '@/app/service-categories';

export const Route = createFileRoute('/_auth/settings/service-categories')({
  component: ServiceCategoriesPage,
});
