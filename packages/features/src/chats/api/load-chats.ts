import { QueryClient } from "@tanstack/react-query";
import { getChatsOptions } from "./get-chats";

export const loadChats = async (groupId: string, queryClient: QueryClient) => {
  await queryClient.ensureQueryData(getChatsOptions(groupId, queryClient));
};
