import { ReactNode } from "react";

import { QueryProvider } from "@synergy/libs/react-query";
import { ThemeProvider } from "@synergy/ui";

import { AuthProvider } from "~/features/auth/components/auth-provider";

type AppProviderProps = Readonly<{
  children?: ReactNode;
}>;

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <QueryProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </AuthProvider>
    </QueryProvider>
  );
};
