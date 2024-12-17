import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getChatsQueryOptions } from "../api/get-chats";

export const useChats = (groupId: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...getChatsQueryOptions(groupId, queryClient),
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
