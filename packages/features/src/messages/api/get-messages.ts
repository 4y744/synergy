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
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { Message, messageSchema } from "../types/message";

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
    queryFn: ({ queryKey, pageParam }) => {
      return new Promise<MessagesPage>(async (resolve, reject) => {
        const messagesCollection = collection(
          db,
          "groups",
          groupId,
          "chats",
          chatId,
          "messages"
        );
        let q!: Query;

        if (pageParam) {
          q = query(
            messagesCollection,
            orderBy("createdAt", "desc"),
            startAfter(pageParam),
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

        const unsubscribe = onSnapshot(
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
            } else {
              unsubscribe();
              reject(messages.error);
              queryClient.removeQueries({ queryKey });
            }
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
    getNextPageParam: (prevPage) => prevPage.nextPage,
    initialPageParam: undefined,
  } satisfies GetMessagesOptions;
};
