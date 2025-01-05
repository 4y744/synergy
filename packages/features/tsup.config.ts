import { defineConfig, Options } from "tsup";
import tsupConfig from "@synergy/configs/tsup";

export default defineConfig((options: Options) => ({
  entry: [
    "./src/auth/index.ts",
    "./src/groups/index.ts",
    "./src/chats/index.ts",
  ],
  ...(tsupConfig as Options),
  ...options,
}));
