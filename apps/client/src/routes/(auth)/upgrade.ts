import { createFileRoute, redirect } from "@tanstack/react-router";

import { auth } from "@synergy/libs/firebase";

import { loadAuth } from "~/features/auth/utils/load-auth";

export const Route = createFileRoute("/(auth)/upgrade")({
  beforeLoad: async ({ context }) => {
    const { authStore } = context;
    const { isSignedIn } = await loadAuth(authStore);
    if (!(isSignedIn && auth.currentUser?.isAnonymous)) {
      throw redirect({ to: "/groups" });
    }
  },
});
