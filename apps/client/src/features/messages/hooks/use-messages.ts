import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { DocumentSnapshot } from "firebase/firestore";

import {
  GetMessagesOptions,
  getMessagesOptions,
  MessagesPage,
} from "../api/get-messages";

type UseMessagesOptions = GetMessagesOptions;

export const useMessages = (
  groupId: string,
  chatId: string,
  options?: Partial<UseMessagesOptions>
) => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useInfiniteQuery({
    ...options,
    ...getMessagesOptions(queryClient, groupId, chatId),
  } satisfies UseMessagesOptions);
  // For some reason useInfiniteQuery thinks
  // ```data``` is of type MessagesPage, instead of InfiniteData
  return {
    data: data as InfiniteData<MessagesPage, DocumentSnapshot> | undefined,
    ...rest,
  };
};
