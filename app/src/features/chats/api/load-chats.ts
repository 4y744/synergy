import { QueryClient } from "@tanstack/react-query";
import { getChatsQueryOptions } from "./get-chats";

export const loadChats = (groupId: string, queryClient: QueryClient) => {
  return queryClient.fetchQuery(getChatsQueryOptions(groupId));
};
