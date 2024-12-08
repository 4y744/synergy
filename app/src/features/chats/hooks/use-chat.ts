import { useQuery } from "@tanstack/react-query";
import { getChatQueryOptions } from "../api/getChat";

export const useChat = (groupId: string, chatId: string) => {
  return useQuery(getChatQueryOptions(groupId, chatId));
};
