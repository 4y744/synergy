import { createFileRoute, redirect } from "@tanstack/react-router";

import { findGroupsOptions } from "@synergy/features/groups";
import { getChatsOptions } from "@synergy/features/chats";
import { getFoldersOptions } from "@synergy/features/folders";

export const Route = createFileRoute("/groups/$groupId")({
  beforeLoad: async ({ context, params }) => {
    const { queryClient } = context;
    const { groupId } = params;
    const groups = await queryClient.ensureQueryData(
      findGroupsOptions(queryClient)
    );
    if (!groups.includes(groupId)) {
      throw redirect({ to: "/groups" });
    }
    await queryClient.ensureQueryData(getChatsOptions(queryClient, groupId));
    await queryClient.ensureQueryData(getFoldersOptions(queryClient, groupId));
  },
});
