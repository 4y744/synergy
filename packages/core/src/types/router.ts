import { AuthStore } from "@synergy/features/auth";
import { QueryClient } from "@tanstack/react-query";

export type RouterContext = {
  queryClient: QueryClient;
  authStore: AuthStore;
};

export type Loader = (data: { context: RouterContext; params: any }) => any;
