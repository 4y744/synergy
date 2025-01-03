import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/auth/index.ts",
    "./src/groups/index.ts",
    "./src/chats/index.ts",
  ],
  format: ["esm"],
  outDir: "./dist",
  dts: true,
  minify: false,
});
