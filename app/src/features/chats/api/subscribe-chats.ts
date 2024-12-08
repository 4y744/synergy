import { collection, onSnapshot } from "firebase/firestore";
import { Chat } from "../types/chat";
import { db } from "@/libs/firebase";

export const subscribeChats = (
  groupId: string,
  options?: {
    onUpdate?: (message: Chat) => void;
    signal?: AbortSignal;
    onAbort?: () => void;
  }
) => {
  return new Promise((resolve: (chats: Chat[]) => void) => {
    const unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "chats"),
      (snapshot) => {
        console.log(snapshot.docs);
        resolve([]);
      }
    );
    options?.signal?.addEventListener("abort", () => {
      unsubscribe();
      options.onAbort?.();
    });
    options?.signal?.throwIfAborted();
  });
};
