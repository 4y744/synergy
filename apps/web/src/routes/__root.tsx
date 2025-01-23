import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { AuthStore } from "@synergy/features/auth";
import { QueryClient } from "@tanstack/react-query";

type RouteContext = {
  queryClient: QueryClient;
  authStore: AuthStore;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: () => <Outlet />,
});
