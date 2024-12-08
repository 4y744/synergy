import { LoadingFallback } from "@/components/fallbacks/loading-fallback";
import { Route } from "@/types/router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";

const createDefine = (queryClient: QueryClient) => {
  const define = (importFn: () => Promise<Route>) => async () => {
    const { default: Component, loader } = await importFn();
    return {
      Component,
      loader: (args: LoaderFunctionArgs) => loader?.(args, queryClient) || null,
    };
  };
  return define;
};

export const createRouter = (queryClient: QueryClient) => {
  const define = createDefine(queryClient);
  return createBrowserRouter([
    {
      path: "",
      lazy: define(() => import("@/routes/(home)/page")),
    },
    {
      path: "",
      lazy: define(() => import("@/routes/(app)/layout")),
      children: [
        {
          path: "groups",
          lazy: define(() => import("@/routes/(app)/groups/layout")),
          children: [
            {
              path: "",
              lazy: define(() => import("@/routes/(app)/groups/page")),
            },
            {
              path: ":groupId",
              lazy: define(
                () => import("@/routes/(app)/groups/[groupId]/layout")
              ),
              children: [
                {
                  path: "",
                  lazy: define(
                    () => import("@/routes/(app)/groups/[groupId]/page")
                  ),
                },
                {
                  path: "chats/:chatId",
                  lazy: define(
                    () =>
                      import(
                        "@/routes/(app)/groups/[groupId]/chats/[chatId]/page"
                      )
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "signin",
      lazy: define(() => import("@/routes/(auth)/signin/page")),
    },
    {
      path: "signup",
      lazy: define(() => import("@/routes/(auth)/signup/page")),
    },
    {
      path: "*",
      lazy: define(() => import("@/routes/not-found")),
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createRouter(queryClient), []);
  return (
    <RouterProvider
      router={router}
      fallbackElement={<LoadingFallback />}
    />
  );
};
