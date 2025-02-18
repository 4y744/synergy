import { useContext } from "react";
import { Loader2Icon } from "lucide-react";

import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { AuthContext } from "@synergy/features/auth";
import { mergeRouteTree } from "@synergy/libs/react-router";

import { routeTree } from "~/routeTree.gen";
import { routeTree as _routeTree } from "@synergy/client";
import { ContentLayout } from "~/components/layouts/content-layout";

export const router = createRouter({
  routeTree: mergeRouteTree(routeTree, _routeTree),
  defaultPreload: "intent",
  defaultPendingComponent: () => (
    <ContentLayout isCentered>
      <Loader2Icon
        className="animate-spin"
        size={48}
      />
    </ContentLayout>
  ),
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
