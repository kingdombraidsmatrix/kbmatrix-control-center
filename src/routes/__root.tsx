import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';

import type { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner.tsx';

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-center" richColors theme="light" />
    </>
  ),
});
