import { AuthStore } from "@synergy/features/auth";
import { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouteContext = {
  queryClient: QueryClient;
  authStore: AuthStore;
};

export const Route = createRootRouteWithContext<RouteContext>()({
  component: Outlet,
});
