import { createThemeStore, ThemeStore } from "~/stores/theme-store";
import { Theme } from "~/types/theme";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useStore } from "zustand";

export const ThemeContext = createContext<ThemeStore>({} as ThemeStore);

export type ThemeProviderProps = {
  children?: ReactNode;
  defaultTheme?: Theme;
};

export const ThemeProvider = ({
  children,
  defaultTheme,
}: ThemeProviderProps) => {
  const [themeStore] = useState<ThemeStore>(createThemeStore(defaultTheme));
  const { theme } = useStore(themeStore);

  const root = window.document.documentElement;

  useEffect(() => {
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeStore}>{children}</ThemeContext.Provider>
  );
};
