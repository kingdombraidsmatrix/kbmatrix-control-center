import { createFileRoute, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { Layout } from '@/components/layout';
import { useAuthStore } from '@/stores/auth/auth.store.ts';

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const { href } = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login', replace: true, search: { from: href } });
    }
  }, [isAuthenticated]);

  return <Layout />;
}
