import { createFileRoute } from "@tanstack/react-router";
import { getChatsOptions } from "@synergy/features/chats";

export const Route = createFileRoute("/groups/$groupId/chats/$chatId")({
  beforeLoad: async ({ context, params }) => {
    const { queryClient } = context;
    await queryClient.ensureQueryData(
      getChatsOptions(params.groupId, queryClient)
    );
  },
});
