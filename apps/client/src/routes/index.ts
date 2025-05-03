import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuth } from "~/features/auth/utils/load-auth";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context }) => {
    const { authStore } = context;
    const { isSignedIn } = await loadAuth(authStore);
    return redirect({
      to: isSignedIn ? "/groups" : "/signin",
    });
  },
});
