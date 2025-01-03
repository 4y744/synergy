import {
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getChatsQueryOptions } from "../api/get-chats";
import { Chat } from "../types/chat";
import { FirestoreError } from "firebase/firestore";

export type UseChatsMutationOptions = UseMutationOptions<
  Chat,
  FirestoreError,
  Chat,
  string[]
>;

export const useChats = (
  groupId: string,
  options?: UseChatsMutationOptions
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...getChatsQueryOptions(groupId, queryClient),
    ...options,
    staleTime: Infinity,
    refetchInterval: Infinity,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
