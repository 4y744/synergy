import { createFileRoute } from "@tanstack/react-router";
import { getMessagesOptions } from "~/features/messages/api/get-messages";

export const Route = createFileRoute("/(app)/groups/$groupId/chats/$chatId")({
  beforeLoad: ({ context, params }) => {
    const { queryClient } = context;
    const { groupId, chatId } = params;
    return queryClient.ensureInfiniteQueryData({
      ...getMessagesOptions(queryClient, groupId, chatId),
    });
  },
});
