import { useContext } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { type RouterContext } from "@synergy/core";
import { AuthContext } from "@synergy/features/auth";

import { routeTree } from "~/routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {} as RouterContext,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

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
