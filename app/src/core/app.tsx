import { RouterProvider } from "react-router";
import { router } from "./router";

import { QueryClientProvider } from "@tanstack/react-query";

import { AuthLoader } from "@/features/auth/components/auth-loader";
import { LoadingFallback } from "@/components/fallbacks/loading-fallback";

export const App = () => {
  return (
    <AuthLoader>
      <RouterProvider
        router={router}
        fallbackElement={<LoadingFallback />}
      />
    </AuthLoader>
  );
};
