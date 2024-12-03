import { RouterProvider } from "react-router";
import { createRouter } from "./router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthLoader } from "@/features/auth/components/auth-loader";
import { LoadingFallback } from "@/components/fallbacks/loading-fallback";
import { useState } from "react";

export const App = () => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchOnWindowFocus: false,
        },
      },
    })
  );
  return (
    <AuthLoader>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={createRouter(queryClient)}
          fallbackElement={<LoadingFallback />}
        />
      </QueryClientProvider>
    </AuthLoader>
  );
};
