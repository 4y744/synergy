import {
  QueryClient,
  QueryOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const chatSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

export type Chat = z.infer<typeof chatSchema>;

type GetChatsOptions = QueryOptions<Chat[], FirestoreError, Chat[], string[]>;

export const getChatsOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId, "chats"],
    queryFn: ({ queryKey }) => {
      return new Promise<Chat[]>((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "chats"),
          (snapshot) => {
            const parsedChats = snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return chatSchema.safeParse({
                id: doc.id,
                name: data?.name,
                createdAt: data?.createdAt.toDate(),
              } satisfies Chat);
            });

            const chats = parsedChats
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(chats);
            queryClient.setQueryData(queryKey, chats);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetChatsOptions;
};

type UseChatsOptions = UseQueryOptions<
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

export const useChat = (
  groupId: string,
  chatId: string,
  options?: Partial<UseChatsOptions>
) => {
  const chats = useChats(groupId, options);
  const { data, ...rest } = chats;
  return {
    ...rest,
    data: chats.data?.find(({ id }) => id == chatId),
  };
};
