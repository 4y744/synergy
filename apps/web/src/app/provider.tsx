import { ReactNode } from "react";

import { ThemeProvider } from "@synergy/ui";

type AppProviderProps = Readonly<{
  children?: ReactNode;
}>;

export const AppProvider = ({ children }: AppProviderProps) => {
  return <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>;
};
