import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "./button";
import { useTheme } from "../hooks/use-theme";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      className="fixed bottom-4 right-16 h-10 w-10"
      variant="ghost"
      onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
    >
      {theme == "dark" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
ThemeToggle.displayName = "ThemeToggle";
