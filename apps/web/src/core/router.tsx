import { useContext, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

import { LoadingFallback } from "~/components/loading-fallback";

import { AuthContext, AuthStore } from "@synergy/features/auth";
import { createCustomRoute } from "@synergy/libs/react-router";

export type CustomLoaderData = {
  authStore: AuthStore;
  queryClient: QueryClient;
};

export const createRouter = (
  authStore: AuthStore,
  queryClient: QueryClient
) => {
  const customRoute = createCustomRoute<CustomLoaderData>({
    authStore,
    queryClient,
  });

  return createBrowserRouter([
    {
      path: "",
      lazy: customRoute(() => import("~/routes/landing")),
    },
    {
      path: "signin",
      lazy: customRoute(() => import("~/routes/signin")),
    },
    {
      path: "signup",
      lazy: customRoute(() => import("~/routes/signup")),
    },
    {
      path: "groups/:groupId?",
      lazy: customRoute(() => import("~/routes/groups/[groupId]")),
      children: [
        {
          path: "chats/:chatId",
          lazy: customRoute(() => import("~/routes/groups/chats/[chatId]")),
        },
      ],
    },
    {
      path: "*",
      lazy: customRoute(() => import("~/routes/not-found")),
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
