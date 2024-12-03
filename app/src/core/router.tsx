import { QueryClient } from "@tanstack/react-query";
import { createBrowserRouter, LoaderFunctionArgs } from "react-router-dom";

const load = (imp: any, queryClient?: QueryClient) => async () => {
  const { default: Component, loader, ...rest } = await imp;
  return {
    Component,
    loader: queryClient
      ? (args: LoaderFunctionArgs) => loader(args, queryClient)
      : loader,
    ...rest,
  };
};

export const createRouter = (queryClient: QueryClient) => {
  return createBrowserRouter([
    {
      path: "",
      lazy: load(import("@/routes/(home)/page")),
    },
    {
      path: "",
      lazy: load(import("@/routes/(app)/layout"), queryClient),
      children: [
        {
          path: "groups",
          lazy: load(import("@/routes/(app)/groups/layout"), queryClient),
          children: [
            {
              path: "",
              lazy: load(import("@/routes/(app)/groups/page")),
            },
            {
              path: ":groupId",
              lazy: load(import("@/routes/(app)/groups/[groupId]/page")),
            },
            {
              path: ":groupId/chats/:chatId",
              lazy: load(
                import("@/routes/(app)/groups/[groupId]/chats/[chatId]/page")
              ),
            },
          ],
        },
      ],
    },
    {
      path: "signin",
      lazy: load(import("@/routes/(auth)/signin/page")),
    },
    {
      path: "signup",
      lazy: load(import("@/routes/(auth)/signup/page")),
    },
    {
      path: "*",
      lazy: load(import("@/routes/not-found")),
    },
  ]);
};
