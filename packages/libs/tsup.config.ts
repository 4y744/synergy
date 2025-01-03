import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "./src/firebase/index.ts",
    "./src/react-router/index.ts",
    "./src/react-query/index.ts",
  ],
  format: ["esm"],
  outDir: "./dist",
  dts: true,
  minify: false,
});
