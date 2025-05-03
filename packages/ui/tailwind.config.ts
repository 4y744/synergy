import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [require("@synergy/config/tailwind")],
} satisfies Config;
