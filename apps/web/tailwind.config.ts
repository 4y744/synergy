import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "../../packages/ui/src/**/*.tsx"],
  presets: [require("@synergy/config/tailwind")],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
