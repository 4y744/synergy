import { defineConfig, type Options } from "tsup";
import tsupConfig from "@synergy/config/tsup";

export default defineConfig((options: Options) => ({
  entry: ["./src/index.ts"],
  ...(tsupConfig as Options),
  ...options,
}));
