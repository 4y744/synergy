import { LoaderFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { AuthStore } from "@/features/auth/stores/auth-store";

export type DataLoader = (options: {
  args: LoaderFunctionArgs;
  authStore: AuthStore;
  queryClient: QueryClient;
}) => any | Promise<any>;

export type Route = {
  default: () => JSX.Element;
  loader?: DataLoader;
};
