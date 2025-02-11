import { useContext } from "react";
import { Loader2Icon } from "lucide-react";
import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

import { routeTree as appRouteTree } from "@synergy/app";
import { AuthContext } from "@synergy/features/auth";

import { routeTree as rootRouteTree } from "~/routeTree.gen";

// Merge base routes and @synergy/app routes.
const router = createRouter({
  routeTree: createRootRoute().addChildren([
    Object.assign({ id: "base" }, rootRouteTree),
    Object.assign({ id: "app" }, appRouteTree),
  ]),
  defaultPreload: "intent",
  defaultPendingComponent: () => {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader2Icon
          className="animate-spin"
          size={48}
        />
      </div>
    );
  },
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
