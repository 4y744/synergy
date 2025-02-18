import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
    "../../packages/client/src/**/*.tsx",
    "../../packages/features/src/**/*.tsx",
    "../../packages/ui/src/**/*.tsx",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif", "system-ui"],
        arcade: ["'Press Start 2P'", "sans-serif", "system-ui"],
      },
    },
  },
  presets: [require("@synergy/configs/tailwind")],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
