import { createFileRoute, redirect } from "@tanstack/react-router";

import { findGroupsOptions } from "~/features/groups/api/find-groups";
import { getMembersOptions } from "~/features/members/api/get-members";
import { getChatsOptions } from "~/features/chats/api/get-chats";
import { getCallsOptions } from "~/features/calls/api/get-calls";
import { getFoldersOptions } from "~/features/folders/api/get-folders";
import { getBoardsOptions } from "~/features/boards/api/get-boards";

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
    await Promise.all([
      queryClient.ensureQueryData(getMembersOptions(queryClient, groupId)),
      queryClient.ensureQueryData(getChatsOptions(queryClient, groupId)),
      queryClient.ensureQueryData(getCallsOptions(queryClient, groupId)),
      queryClient.ensureQueryData(getFoldersOptions(queryClient, groupId)),
      queryClient.ensureQueryData(getBoardsOptions(queryClient, groupId)),
    ]);
  },
});
