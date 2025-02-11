import { createFileRoute } from "@tanstack/react-router";

import { getMessagesOptions } from "@synergy/features/messages";

export const Route = createFileRoute("/groups/$groupId/chats/$chatId")({
  beforeLoad: ({ context, params }) => {
    const { queryClient } = context;
    const { groupId, chatId } = params;
    return queryClient.ensureInfiniteQueryData({
      ...getMessagesOptions(queryClient, groupId, chatId),
    });
  },
});
