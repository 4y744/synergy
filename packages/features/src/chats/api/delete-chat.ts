import { MutationOptions } from "@tanstack/react-query";

import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

const deleteChat = (groupId: string, chatId: string) => {
  return deleteDoc(doc(db, "groups", groupId, "chats", chatId));
};

type DeleteChatOptions = MutationOptions<void, FirestoreError, void>;

export const deleteChatOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: () => deleteChat(groupId, chatId),
  } satisfies DeleteChatOptions;
};
