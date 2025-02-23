import { createRouter, RouterProvider } from "@tanstack/react-router";

import { LoadingFallback } from "~/components/loading-fallback";

import { routeTree } from "~/routeTree.gen";

export const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: LoadingFallback,
});

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
