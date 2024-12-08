import { useInfiniteQuery } from "@tanstack/react-query";
import { getMessagesQueryOptions } from "../api/get-messages";

export const useMessages = (groupId: string, chatId: string) => {
  return useInfiniteQuery(getMessagesQueryOptions(groupId, chatId));
};
