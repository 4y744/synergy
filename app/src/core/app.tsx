import { useState, useMemo } from "react";

import { RouterProvider } from "react-router";
import { createAppRouter } from "./router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/components/AuthProvider";

export const App = () => {
  const [queryClient] = useState(new QueryClient({}));
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};
