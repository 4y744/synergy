import { lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { loadAuth } from "@synergy/features/auth";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  beforeLoad: async ({ context }) => {
    const { authStore } = context;
    await loadAuth(authStore);
    if (authStore.getState().isSignedIn) {
      throw redirect({ to: "/groups" });
    }
  },
  component: lazy(() => import("~/components/views/sign-up-view")),
});
