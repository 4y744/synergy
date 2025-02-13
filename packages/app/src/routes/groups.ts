import { loadAuth } from "@synergy/features/auth";
import { findGroupsOptions, getGroupOptions } from "@synergy/features/groups";
import { getUserOptions } from "@synergy/features/users";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/groups")({
  beforeLoad: async ({ context }) => {
    const { authStore, queryClient } = context;
    const { isSignedIn, uid } = await loadAuth(authStore);
    if (!isSignedIn) {
      throw redirect({ to: "/signin" });
    }
    await queryClient.ensureQueryData(getUserOptions(queryClient, uid));
    const groupIds = await queryClient.ensureQueryData(
      findGroupsOptions(queryClient)
    );
    await Promise.all(
      groupIds.map((groupId) => {
        return queryClient.ensureQueryData(
          getGroupOptions(queryClient, groupId)
        );
      })
    );
  },
});
