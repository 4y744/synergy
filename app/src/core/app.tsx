import { RouterProvider } from "react-router";
import { router } from "./router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";

import { AuthProvider } from "@/features/auth/components";

export const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};
