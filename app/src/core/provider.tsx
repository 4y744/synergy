import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/features/auth/components/auth-provider";

type Props = Readonly<{
  children?: ReactNode;
}>;

export const AppProvider = ({ children }: Props) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};
