import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { getChatsOptions } from "../api/get-chats";
import { Chat } from "../types/chat";

export type UseChatsOptions = UseQueryOptions<
  Chat[],
  FirestoreError,
  Chat[],
  string[]
>;

export const useChats = (
  groupId: string,
  options?: Partial<UseChatsOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getChatsOptions(queryClient, groupId),
  } satisfies UseChatsOptions);
};
