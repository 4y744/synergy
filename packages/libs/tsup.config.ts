import { defineConfig, type Options } from "tsup";
import tsupConfig from "@synergy/config/tsup";

export default defineConfig((options: Options) => ({
  entry: ["./src/firebase/index.ts", "./src/react-query/index.ts"],
  ...(tsupConfig as Options),
  ...options,
}));
