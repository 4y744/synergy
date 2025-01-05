import { QueryClient } from "@tanstack/react-query";
import { getChatsQueryOptions } from "./get-chats";

export const loadChats = async (groupId: string, queryClient: QueryClient) => {
  await queryClient.ensureQueryData(getChatsQueryOptions(groupId, queryClient));
};
