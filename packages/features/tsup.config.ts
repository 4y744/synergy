import { defineConfig, type Options } from "tsup";
import tsupConfig from "@synergy/configs/tsup";

export default defineConfig((options: Options) => ({
  entry: [
    "./src/auth/index.ts",
    "./src/chats/index.ts",
    "./src/files/index.ts",
    "./src/folders/index.ts",
    "./src/groups/index.ts",
    "./src/invites/index.ts",
    "./src/members/index.ts",
    "./src/messages/index.ts",
    "./src/users/index.ts",
  ],
  ...(tsupConfig as Options),
  ...options,
}));
