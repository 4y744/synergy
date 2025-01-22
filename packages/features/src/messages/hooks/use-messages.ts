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
    ...getMessagesOptions(groupId, chatId, queryClient),
    staleTime: Infinity,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  } satisfies UseMessagesOptions);
  // Tsup refuses to make DTS files if getMessageQueryOptions's
  // return value isn't explicitly annotated.
  // But annotating it somehow makes data get
  // the type MessagesPage instead of InfiniteData<MessagesPage>.
  // Most likely there's something wrong in useInfiniteQuery's
  // type definition, because no other hooks has this issue.
  return {
    data: data as InfiniteData<MessagesPage, DocumentSnapshot> | undefined,
    ...rest,
  };
};
