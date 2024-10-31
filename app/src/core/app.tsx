import { RouterProvider } from "react-router";
import { router } from "./router";

import { store } from "./store";
import { StoreProvider } from "@/libs/redux";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";

import { AuthProvider } from "@/features/auth/components";

export const App = () => {
  return (
    <StoreProvider store={store}>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </StoreProvider>
  );
};
