import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { MutationOptions } from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";

import { UpdateChatInput } from "../types/update-chat";

const updateChat = (groupId: string, chatId: string, data: UpdateChatInput) => {
  return updateDoc(doc(db, "groups", groupId, "chats", chatId), data);
};

type UpdateChatOptions = MutationOptions<void, FirestoreError, UpdateChatInput>;

export const updateChatOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: (data) => updateChat(groupId, chatId, data),
  } satisfies UpdateChatOptions;
};
