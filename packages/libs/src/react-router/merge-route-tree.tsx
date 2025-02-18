import { AnyRootRoute, Route } from "@tanstack/react-router";

export const mergeRouteTree = (
  primaryRouteTree: AnyRootRoute,
  secondaryRouteTree: AnyRootRoute
) => {
  (secondaryRouteTree.children as Route[]).forEach((route) => {
    primaryRouteTree.addChildren([
      ...(primaryRouteTree.children as Route[]),
      route.update({
        //@ts-ignore
        getParentRoute: () => primaryRouteTree,
      }),
    ]);
  });

  return primaryRouteTree;
};
