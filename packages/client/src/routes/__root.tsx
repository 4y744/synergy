import { createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";

import { AuthStore } from "@synergy/features/auth";

type RouteContext = {
  queryClient: QueryClient;
  authStore: AuthStore;
};

// This does nothing other than provide type information for rootTree.gen
// Combining 2 routeTrees simply does nothing, so its children are used instead.
export const Route = createRootRouteWithContext<RouteContext>()({});
