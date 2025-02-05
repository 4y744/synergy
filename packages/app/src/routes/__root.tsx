import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { AuthStore } from "@synergy/features/auth";

type RouteContext = {
  queryClient: QueryClient;
  authStore: AuthStore;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => <Outlet />,
});
