import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RouterContext } from "@synergy/core";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
