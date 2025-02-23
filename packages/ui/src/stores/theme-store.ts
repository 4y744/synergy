import { createStore } from "zustand";
import { persist } from "zustand/middleware";

import { Theme } from "~/types/theme";

export type ThemeState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const createThemeStore = (defaultTheme?: Theme) => {
  return createStore<ThemeState>()(
    persist(
      (set) => ({
        theme: defaultTheme || "dark",
        setTheme: (theme) => set({ theme }),
      }),
      {
        name: "theme",
      }
    )
  );
};

export type ThemeStore = ReturnType<typeof createThemeStore>;
