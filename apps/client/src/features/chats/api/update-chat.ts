import { MutationOptions } from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { UpdateChatInput } from "../types/update-chat";

type UpdateChatOptions = MutationOptions<void, FirestoreError, UpdateChatInput>;

export const updateChatOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: (data) => {
      return updateDoc(doc(db, "groups", groupId, "chats", chatId), data);
    },
  } satisfies UpdateChatOptions;
};
