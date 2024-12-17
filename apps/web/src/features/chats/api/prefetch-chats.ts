import { QueryClient } from "@tanstack/react-query";
import { getChatsQueryOptions } from "./get-chats";

export const prefetchChats = async (
  groupId: string,
  queryClient: QueryClient
) => {
  return queryClient.ensureQueryData(
    getChatsQueryOptions(groupId, queryClient)
  );
};
