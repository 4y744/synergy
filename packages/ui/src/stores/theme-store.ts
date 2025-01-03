import { Theme } from "~/types/theme";
import { createStore } from "zustand";

export type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const createThemeStore = (defaultTheme?: Theme) => {
  return createStore<ThemeState>((set) => ({
    theme: defaultTheme || "dark",
    setTheme: (theme) => set({ theme }),
  }));
};

export type ThemeStore = ReturnType<typeof createThemeStore>;
