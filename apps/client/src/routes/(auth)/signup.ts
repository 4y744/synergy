import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuth } from "~/features/auth/utils/load-auth";

export const Route = createFileRoute("/(auth)/signup")({
  beforeLoad: async ({ context }) => {
    const { authStore } = context;
    const { isSignedIn } = await loadAuth(authStore);
    if (isSignedIn) {
      throw redirect({ to: "/groups" });
    }
  },
});
