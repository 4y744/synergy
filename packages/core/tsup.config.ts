import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  format: ["esm"],
  outDir: "./dist",
  dts: true,
  minify: false,
});
