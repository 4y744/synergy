import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import {
  QueryClient,
  QueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";

import { Chat, ChatSchema } from "../types/chat";

export const subscribeChats = async (
  groupId: string,
  onUpdate: (chats: Chat[]) => void
) => {
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
            creator: data?.creator,
            created: data?.created.toDate(),
          });
        });
        resolve(chats);
        onUpdate(chats);
      }
    );
  });
  return { chats, unsubscribe };
};

export type GetChatQueryOptions = QueryOptions<
  Chat,
  FirestoreError,
  Chat,
  string[]
>;

export const getChatsQueryOptions = (
  groupId: string,
  queryClient: QueryClient
) => {
  return {
    queryKey: ["groups", groupId, "chats"],
    queryFn: async ({ queryKey }) => {
      const { chats, unsubscribe } = await subscribeChats(groupId, (group) => {
        queryClient.setQueryData(queryKey, group);
      });
      const remove = queryClient
        .getQueryCache()
        .subscribe(({ query, type }) => {
          if (
            query.queryKey.toString() == queryKey.toString() &&
            type == "observerRemoved" &&
            query.getObserversCount() === 0
          ) {
            remove();
            unsubscribe?.();
            queryClient.removeQueries({ queryKey });
          }
        });
      return chats;
    },
  } satisfies UseQueryOptions;
};
