import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { QueryClient, QueryOptions } from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";
import { registerQuerySubscription } from "@synergy/libs/react-query";

import { Chat, ChatSchema } from "../types/chat";

const getChats = async (groupId: string, onUpdate: (chats: Chat[]) => void) => {
  let unsubscribe!: Unsubscribe;
  const chats = await new Promise((resolve: (chats: Chat[]) => void) => {
    unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "chats"),
      (snapshot) => {
        const chats = snapshot.docs.map((doc) => {
          const data = doc.data({ serverTimestamps: "estimate" });
          return ChatSchema.parse({
            id: doc.id,
            name: data?.name,
            createdBy: data?.createdBy,
            createdAt: data?.createdAt.toDate(),
          });
        });
        resolve(chats);
        onUpdate(chats);
      },
      unsubscribe
    );
  });
  return { chats, unsubscribe };
};

type GetChatsOptions = QueryOptions<Chat[], FirestoreError, Chat[], string[]>;

export const getChatsOptions = (groupId: string, queryClient: QueryClient) => {
  return {
    queryKey: ["groups", groupId, "chats"],
    queryFn: async ({ queryKey }) => {
      const { chats, unsubscribe } = await getChats(groupId, (group) => {
        queryClient.setQueryData(queryKey, group);
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return chats;
    },
  } satisfies GetChatsOptions;
};
