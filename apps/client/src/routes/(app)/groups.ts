import { createFileRoute, redirect } from "@tanstack/react-router";

import { loadAuth } from "~/features/auth/utils/load-auth";
import { findGroupsOptions } from "~/features/groups/api/find-groups";
import { getGroupOptions } from "~/features/groups/api/get-group";
import { getUserOptions } from "~/features/users/api/get-user";

export const Route = createFileRoute("/(app)/groups")({
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
