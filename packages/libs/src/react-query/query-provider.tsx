import { QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type QueryProviderProps = Readonly<{
  children?: ReactNode;
  config?: QueryClientConfig;
}>;

export const QueryProvider = ({ children, config }: QueryProviderProps) => {
  const [queryClient] = useState(new QueryClient(config));
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
