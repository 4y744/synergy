import { ReactNode, useState } from "react";
import {
  QueryClientConfig,
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

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
