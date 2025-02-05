import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuth } from "@synergy/features/auth";
import { findGroupsOptions, getGroupOptions } from "@synergy/features/groups";

export const Route = createFileRoute("/groups")({
  beforeLoad: async ({ context }) => {
    const { authStore, queryClient } = context;
    const { uid } = await loadAuth(authStore);
    if (!uid) {
      throw redirect({ to: "/signin" });
    }
    const groupIds = await queryClient.ensureQueryData(findGroupsOptions());
    await Promise.all(
      groupIds.map((groupId) => {
        return queryClient.ensureQueryData(
          getGroupOptions(groupId, queryClient)
        );
      })
    );
  },
});
