import { ReactNode } from "react";

import { AuthProvider } from "@synergy/features/auth";
import { QueryProvider } from "@synergy/libs/react-query";

type AppProviderProps = Readonly<{
  children?: ReactNode;
}>;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
};
