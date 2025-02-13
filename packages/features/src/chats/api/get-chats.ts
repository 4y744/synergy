import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { Chat, chatSchema } from "../types/chat";

type GetChatsOptions = QueryOptions<
  Chat[],
  FirestoreError | ZodError<Chat[]>,
  Chat[],
  string[]
>;

export const getChatsOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId, "chats"],
    queryFn: ({ queryKey }) => {
      return new Promise<Chat[]>((resolve, reject) => {
        const unsubscribe = onSnapshot(
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
              queryClient.setQueryData(queryKey, chats.data);
            } else {
              unsubscribe();
              reject(chats.error);
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
  } satisfies GetChatsOptions;
};
