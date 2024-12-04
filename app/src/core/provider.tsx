import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthLoader } from "@/features/auth/components/auth-loader";

type Props = Readonly<{
  children?: ReactNode;
}>;

export const AppProvider = ({ children }: Props) => {
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
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthLoader>
  );
};
