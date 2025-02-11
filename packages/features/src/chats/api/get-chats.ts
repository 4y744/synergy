import { QueryClient, QueryOptions } from "@tanstack/react-query";

import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { registerQuerySubscription } from "@synergy/libs/react-query";

import { Chat, chatSchema } from "../types/chat";

const getChats = async (
  groupId: string,
  options?: {
    onUpdate?: (chats: Chat[]) => void;
    onError?: (error: FirestoreError | ZodError<Chat[]>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const chats = await new Promise(
    (
      resolve: (chats: Chat[]) => void,
      reject: (error: ZodError<Chat[]>) => void
    ) => {
      unsubscribe = onSnapshot(
        collection(db, "groups", groupId, "chats"),
        (snapshot) => {
          const chats = chatSchema.array().safeParse(
            snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return {
                id: doc.id,
                name: data?.name,
                createdAt: data?.createdAt.toDate(),
              } satisfies Chat;
            })
          );

          if (chats.success) {
            resolve(chats.data);
            options?.onUpdate?.(chats.data);
          } else {
            reject(chats.error);
            options?.onError?.(chats.error);
          }
        },
        options?.onError
      );
    }
  );
  return { chats, unsubscribe };
};

type GetChatsOptions = QueryOptions<
  Chat[],
  FirestoreError | ZodError<Chat[]>,
  Chat[],
  string[]
>;

export const getChatsOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId, "chats"],
    queryFn: async ({ queryKey }) => {
      const { chats, unsubscribe } = await getChats(groupId, {
        onUpdate: (group) => {
          queryClient.setQueryData(queryKey, group);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return chats;
    },
  } satisfies GetChatsOptions;
};
