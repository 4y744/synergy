import { ReactNode } from "react";

import { AuthProvider } from "@synergy/features/auth";
import { QueryProvider } from "@synergy/libs/react-query";
import { ThemeProvider } from "@synergy/ui";

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
