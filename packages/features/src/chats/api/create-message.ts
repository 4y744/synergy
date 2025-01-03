import { db } from "@synergy/libs/firebase";
import { UseMutationOptions } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";

export const createMessage = async (
  groupId: string,
  chatId: string,
  payload: string
) => {
  const messageDoc = await addDoc(
    collection(db, "groups", groupId, "chats", chatId, "messages"),
    {
      created: serverTimestamp(),
      payload,
    }
  );
  return messageDoc.id;
};

export type CreateMessageMutationOptions = UseMutationOptions<
  string,
  FirestoreError,
  { payload: string }
>;

export const createMessageMutationOptions = (
  groupId: string,
  chatId: string
) => {
  return {
    mutationKey: ["messages", "create"],
    mutationFn: ({ payload }) => {
      return createMessage(groupId, chatId, payload);
    },
  } satisfies CreateMessageMutationOptions;
};
