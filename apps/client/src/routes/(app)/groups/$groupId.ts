import { createFileRoute, redirect } from "@tanstack/react-router";

import { getChatsOptions } from "~/features/chats/api/get-chats";
import { getFoldersOptions } from "~/features/folders/api/get-folders";
import { findGroupsOptions } from "~/features/groups/api/find-groups";

export const Route = createFileRoute("/(app)/groups/$groupId")({
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
