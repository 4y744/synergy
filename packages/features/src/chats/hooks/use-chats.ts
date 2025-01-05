import {
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { getChatsQueryOptions } from "../api/get-chats";
import { Chat } from "../types/chat";

export type UseChatsMutationOptions = UseMutationOptions<
  Chat,
  FirestoreError,
  Chat,
  string[]
>;

export const useChats = (
  groupId: string,
  options?: Partial<UseChatsMutationOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getChatsQueryOptions(groupId, queryClient),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
};
