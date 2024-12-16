import { LoadingFallback } from "@/components/fallbacks/loading-fallback";
import { AuthContext } from "@/features/auth/components/auth-provider";
import { AuthStore } from "@/features/auth/stores/auth-store";
import { Route } from "@/types/router";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import {
  createBrowserRouter,
  LoaderFunctionArgs,
  RouterProvider,
} from "react-router-dom";

const createDefine = (authStore: AuthStore, queryClient: QueryClient) => {
  const define = (importFn: () => Promise<Route>) => async () => {
    const { default: Component, loader } = await importFn();
    return {
      Component,
      loader: (args: LoaderFunctionArgs) =>
        loader?.({ args, authStore, queryClient }) || null,
    };
  };
  return define;
};

export const createRouter = (
  authStore: AuthStore | undefined,
  queryClient: QueryClient
) => {
  if (!authStore) {
    throw new Error("Can't find AuthProvider!");
  }
  const define = createDefine(authStore, queryClient);

  return createBrowserRouter([
    {
      path: "",
      lazy: define(() => import("@/routes/home")),
    },
    {
      path: "signin",
      lazy: define(() => import("@/routes/home")),
    },
    {
      path: "signup",
      lazy: define(() => import("@/routes/home")),
    },
    {
      path: "groups/:groupId",
      lazy: define(() => import("@/routes/groups/group")),
      children: [
        {
          path: "chats/:chatId",
          lazy: define(() => import("@/routes/groups/chats/chat")),
        },
      ],
    },
    {
      path: "*",
      lazy: define(() => import("@/routes/home")),
    },
  ]);
};

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const authStore = useContext(AuthContext);

  const router = useMemo(() => createRouter(authStore, queryClient), []);

  return (
    <RouterProvider
      router={router}
      fallbackElement={<LoadingFallback />}
    />
  );
};
