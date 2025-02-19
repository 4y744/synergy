import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "~/routeTree.gen";

export const router = createRouter({
  routeTree: routeTree,
  defaultPreload: "intent",
});

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
