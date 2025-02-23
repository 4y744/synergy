import { MutationOptions } from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteChatOptions = MutationOptions<void, FirestoreError, void>;

export const deleteChatOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: () => deleteDoc(doc(db, "groups", groupId, "chats", chatId)),
  } satisfies DeleteChatOptions;
};
