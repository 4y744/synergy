import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type QueryProviderProps = Readonly<{
  children?: ReactNode;
}>;

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: Infinity,
          refetchIntervalInBackground: false,
          refetchOnWindowFocus: false,
          throwOnError: true,
        },
        mutations: {
          throwOnError: true,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
