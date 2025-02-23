import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx", "../../packages/ui/src/**/*.tsx"],
  presets: [require("@synergy/configs/tailwind")],
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
