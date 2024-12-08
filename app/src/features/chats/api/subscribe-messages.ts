import { db } from "@/libs/firebase";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import { Message, MessageSchema } from "../types/message";
import { UseQueryOptions } from "@tanstack/react-query";

export const subscribeMessages = (
  groupId: string,
  chatId: string,
  options?: {
    onUpdate?: (message: Message) => void;
    signal?: AbortSignal;
    onAbort?: () => void;
  }
) => {
  return new Promise((resolve: (message: Message) => void) => {
    const unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "chats", chatId, "messages"),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          const data = doc.data();
          const message = MessageSchema.parse({
            id: doc.id,
            name: data?.name,
            creator: data?.creator,
            created: new Date(data?.created.seconds),
          });
          return message;
        });
        resolve(messages[0]);
        options?.onUpdate?.(messages[0]);
      }
    );
    options?.signal?.addEventListener("abort", () => {
      unsubscribe();
      options.onAbort?.();
    });
    options?.signal?.throwIfAborted();
  });
};

export const subscribeMessagesQueryOptions = (
  groupId: string,
  chatId: string,
  options?: {
    onUpdate?: (messages: Message) => void;
    onAbort?: () => void;
  }
) => {
  return {
    queryKey: ["groups", groupId, "chat", chatId],
    queryFn: ({ signal }) => {
      return subscribeMessages(groupId, chatId, { ...options, signal });
    },
  } satisfies UseQueryOptions;
};
