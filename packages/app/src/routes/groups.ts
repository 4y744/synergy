import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuth } from "@synergy/features/auth";
import { findGroupsOptions, getGroupOptions } from "@synergy/features/groups";

export const Route = createFileRoute("/groups")({
  beforeLoad: async ({ context }) => {
    const { authStore, queryClient } = context;
    const { isSignedIn } = await loadAuth(authStore);
    if (!isSignedIn) {
      throw redirect({ to: "/signin" });
    }
    const groupIds = await queryClient.ensureQueryData(
      findGroupsOptions(queryClient)
    );
    return Promise.all(
      groupIds.map((groupId) => {
        return queryClient.ensureQueryData(
          getGroupOptions(queryClient, groupId)
        );
      })
    );
  },
});
