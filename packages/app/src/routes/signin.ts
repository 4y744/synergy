import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuth } from "@synergy/features/auth";

export const Route = createFileRoute("/signin")({
  beforeLoad: async ({ context }) => {
    const { authStore } = context;
    const { isSignedIn } = await loadAuth(authStore);
    if (isSignedIn) {
      throw redirect({ to: "/groups" });
    }
  },
});
