import {
  UseMutationOptions,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { getChatsOptions } from "../api/get-chats";
import { Chat } from "../types/chat";

export type UseChatsOptions = UseMutationOptions<
  Chat,
  FirestoreError,
  Chat,
  string[]
>;

export const useChats = (
  groupId: string,
  options?: Partial<UseChatsOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getChatsOptions(groupId, queryClient),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });
};
