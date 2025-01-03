import { useContext } from "react";
import { useStore } from "zustand";

import { ThemeContext } from "~/components/theme-provider";

export const useTheme = () => {
  const themeStore = useContext(ThemeContext);
  return useStore(themeStore);
};
