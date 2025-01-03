import { db } from "@synergy/libs/firebase";
import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";
import { Chat, ChatSchema } from "../types/chat";
import {
  QueryClient,
  QueryOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

export const getChats = (
  groupId: string,
  onUpdate: (chats: Chat[]) => void
) => {
  let unsubscribe: Unsubscribe;
  const chats = new Promise((resolve: (chats: Chat[]) => void) => {
    unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "chats"),
      async (snapshot) => {
        const chats = snapshot.docs.map((doc) => {
          const data = doc.data();
          const chat = ChatSchema.parse({
            id: doc.id,
            name: data?.name,
            creator: data?.creator,
            created: new Date(data?.created.seconds),
          });
          return chat;
        });
        resolve(chats);
        onUpdate(chats);
      }
    );
  });
  return { chats, unsubscribe: unsubscribe! };
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
    queryFn: ({ queryKey }) => {
      const { chats, unsubscribe } = getChats(groupId, (group) => {
        queryClient.setQueryData(queryKey, group);
      });
      const remove = queryClient
        .getQueryCache()
        .subscribe(({ query, type }) => {
          if (
            query.queryKey == queryKey &&
            type == "observerRemoved" &&
            query.getObserversCount() === 0
          ) {
            remove();
            unsubscribe?.();
            queryClient.invalidateQueries({ queryKey });
          }
        });
      return chats;
    },
  } satisfies UseQueryOptions;
};
