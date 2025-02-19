import { createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { AuthStore } from "~/features/auth/stores/auth-store";

export type RouteContext = {
  queryClient: QueryClient;
  authStore: AuthStore;
};

export const Route = createRootRouteWithContext<RouteContext>()({});
