import {
  InfiniteData,
  QueryClient,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQueryClient,
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
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const messageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  payload: z.string(),
  createdBy: z.string(),
});

export type Message = z.infer<typeof messageSchema>;

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
          const { docs } = await getDocs(
            query(messagesCollection, orderBy("createdAt", "desc"), limit(1))
          );
          q = query(
            messagesCollection,
            orderBy("createdAt", "desc"),
            endAt(docs[0])
          );
        }

        onSnapshot(
          q,
          (snapshot) => {
            const parsedMessages = snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return messageSchema.safeParse({
                id: doc.id,
                payload: data?.payload,
                createdBy: data?.createdBy,
                createdAt: data?.createdAt.toDate(),
              } satisfies Message);
            });

            const messages = parsedMessages
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            const messagesPage = {
              messages: messages.filter(({ payload }) => payload != "__init__"),
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
