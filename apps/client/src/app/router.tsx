import { useContext } from "react";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "~/features/auth/components/auth-provider";

import { ErrorFallback } from "~/components/error-fallback";
import { LoadingFallback } from "~/components/loading-fallback";

import { RouteContext } from "~/routes/__root";
import { routeTree } from "~/routeTree.gen";

export const router = createRouter({
  routeTree,
  context: {} as RouteContext,
  defaultPreload: "intent",
  defaultPendingComponent: LoadingFallback,
  defaultErrorComponent: ErrorFallback,
});

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const authStore = useContext(AuthContext);

  return (
    <RouterProvider
      router={router}
      context={{ queryClient, authStore }}
    />
  );
};
