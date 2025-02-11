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

import { registerQuerySubscription } from "@synergy/libs/react-query";

import { Message, messageSchema } from "../types/message";
import { ZodError } from "zod";

const getMessages = async (
  groupId: string,
  chatId: string,
  last: DocumentSnapshot | undefined,
  options?: {
    onUpdate?: (messages: MessagesPage) => void;
    onError?: (error: FirestoreError | ZodError<Message[]>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const messages = await new Promise(
    async (
      resolve: (messages: MessagesPage) => void,
      reject: (error: ZodError<Message[]>) => void
    ) => {
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
          messagesCollection,
          orderBy("createdAt", "desc"),
          startAfter(last),
          limit(50)
        );
      } else {
        //TODO: Try to retreive the 50th (or last if < 50) element and use that as a reference point.
        //Might be possible with startAfter(50), limit(1) or something like that.
        const { docs } = await getDocs(
          query(messagesCollection, orderBy("createdAt", "desc"), limit(1))
        );
        q = query(
          messagesCollection,
          orderBy("createdAt", "desc"),
          endAt(docs[0])
        );
      }

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const messages = messageSchema.array().safeParse(
            snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return {
                id: doc.id,
                payload: data?.payload,
                createdBy: data?.createdBy,
                createdAt: data?.createdAt.toDate(),
              } satisfies Message;
            })
          );

          if (messages.success) {
            const messagesPage = {
              messages: messages.data.filter(
                ({ payload }) => payload != "__init__"
              ),
              nextPage: snapshot.docs[snapshot.docs.length - 1],
            };
            resolve(messagesPage);
            options?.onUpdate?.(messagesPage);
          } else {
            reject(messages.error);
            options?.onError?.(messages.error);
          }
        },
        options?.onError
      );
    }
  );
  return { messages, unsubscribe };
};

export type MessagesPage = {
  messages: Message[];
  nextPage: DocumentSnapshot;
};

export type GetMessagesOptions = UseInfiniteQueryOptions<
  MessagesPage,
  FirestoreError,
  MessagesPage,
  MessagesPage,
  string[],
  DocumentSnapshot | undefined
>;

export const getMessagesOptions = (
  queryClient: QueryClient,
  groupId: string,
  chatId: string
): GetMessagesOptions => {
  return {
    queryKey: ["groups", groupId, "chats", chatId, "messages"],
    queryFn: async ({ queryKey, pageParam }) => {
      const { messages, unsubscribe } = await getMessages(
        groupId,
        chatId,
        pageParam,
        {
          onUpdate: (messagesPage) => {
            queryClient.setQueryData(
              queryKey,
              (
                data: InfiniteData<MessagesPage, DocumentSnapshot | undefined>
              ) => {
                if (!data) {
                  return undefined;
                }
                data.pages = data.pages.map((page) => {
                  const isMatch =
                    page.nextPage?.id == messagesPage.nextPage?.id;
                  return isMatch ? messagesPage : page;
                });
                return data;
              }
            );
          },
        }
      );
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return messages;
    },
    getNextPageParam: (prevPage) => prevPage.nextPage,
    initialPageParam: undefined,
  } satisfies GetMessagesOptions;
};
