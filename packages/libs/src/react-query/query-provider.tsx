import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type QueryProviderProps = Readonly<{
  children?: ReactNode;
}>;

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
