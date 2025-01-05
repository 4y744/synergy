import {
  InfiniteData,
  QueryClient,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
import {
  collection,
  DocumentSnapshot,
  endAt,
  FirestoreError,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  Query,
  query,
  startAfter,
  Unsubscribe,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { Message, MessageSchema } from "../types/message";

export const getMessages = async (
  groupId: string,
  chatId: string,
  last: DocumentSnapshot | undefined,
  onUpdate?: (messages: MessagesPage) => void
) => {
  let unsubscribe!: Unsubscribe;
  const messages = await new Promise(
    async (resolve: (messages: MessagesPage) => void) => {
      const messagesCollection = collection(
        db,
        "groups",
        groupId,
        "chats",
        chatId,
        "messages"
      );
      let q!: Query;

      if (last) {
        q = query(
          collection(db, "groups", groupId, "chats", chatId, "messages"),
          orderBy("created", "desc"),
          startAfter(last),
          limit(50)
        );
      } else {
        const { docs } = await getDocs(
          query(messagesCollection, orderBy("created", "desc"), limit(1))
        );
        q = query(
          messagesCollection,
          orderBy("created", "desc"),
          endAt(docs[0])
        );
      }

      unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data({ serverTimestamps: "estimate" });
          return MessageSchema.parse({
            id: doc.id,
            payload: data?.payload,
            createdBy: data?.createdBy,
            created: data?.created.toDate(),
          } satisfies Message);
        });
        const messagesPage = {
          messages,
          nextPage: snapshot.docs[snapshot.docs.length - 1],
        };
        resolve(messagesPage);
        onUpdate?.(messagesPage);
      });
    }
  );
  return { messages, unsubscribe };
};

export type MessagesPage = {
  messages: Message[];
  nextPage: DocumentSnapshot;
};

export type GetMessagesQueryOptions = UseInfiniteQueryOptions<
  MessagesPage,
  FirestoreError,
  MessagesPage,
  MessagesPage,
  string[],
  DocumentSnapshot | undefined
>;

export const getMessagesQueryOptions = (
  groupId: string,
  chatId: string,
  queryClient: QueryClient
): GetMessagesQueryOptions => {
  return {
    queryKey: ["groups", groupId, "chats", chatId, "messages"],
    queryFn: async ({ queryKey, pageParam }) => {
      const { messages, unsubscribe } = await getMessages(
        groupId,
        chatId,
        pageParam,
        (messagesPage) => {
          queryClient.setQueryData(
            queryKey,
            (
              data: InfiniteData<MessagesPage, DocumentSnapshot | undefined>
            ) => {
              if (!data) {
                return undefined;
              }
              data.pages = data.pages.map((page) => {
                const isMatch = page.nextPage?.id == messagesPage.nextPage?.id;
                return isMatch ? messagesPage : page;
              });
              return data;
            }
          );
        }
      );
      // const remove = queryClient
      //   .getQueryCache()
      //   .subscribe(({ query, type }) => {
      //     if (
      //       query.queryKey.toString() == queryKey.toString() &&
      //       type == "observerRemoved" &&
      //       query.getObserversCount() === 0
      //     ) {
      //       remove();
      //       unsubscribe?.();
      //       queryClient.removeQueries({ queryKey });
      //     }
      //   });
      return messages;
    },
    getNextPageParam: (prevPage) => prevPage.nextPage,
    initialPageParam: undefined,
  } satisfies GetMessagesQueryOptions;
};
