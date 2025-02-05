import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  presets: [require("@synergy/configs/tailwind")],
} satisfies Config;
