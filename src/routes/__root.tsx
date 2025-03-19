import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { MainHeader } from '@/components/MainHeader';
import { AuthStore } from '@/store/auth.store';

interface RouterContext {
  queryClient: QueryClient;
  auth: AuthStore;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});
function RootComponent() {
  return (
    <div className="p-5">
      <MainHeader />

      <div className="py-5">
        <Outlet />
      </div>

      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  );
}
