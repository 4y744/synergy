import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tanstackRouterVite from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tanstackRouterVite()],
  server: {
    port: 5174,
  },
});
