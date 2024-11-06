import { RouterProvider } from "react-router";
import { router } from "./router";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/libs/react-query";

import { LoadingFallback } from "@/components/fallbacks";
import { AuthLoader } from "@/features/auth/components";

export const App = () => {
  return (
    <AuthLoader>
      <QueryClientProvider client={queryClient}>
        <RouterProvider
          router={router}
          fallbackElement={<LoadingFallback />}
        />
      </QueryClientProvider>
    </AuthLoader>
  );
};
