import { MutationOptions } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { CreateMessageInput } from "../types/create-message";

type CreateMessageOptions = MutationOptions<
  string,
  FirestoreError,
  CreateMessageInput
>;

export const createMessageOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: async (data) => {
      const { id } = await addDoc(
        collection(db, "groups", groupId, "chats", chatId, "messages"),
        {
          ...data,
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser!.uid,
        }
      );
      return id;
    },
  } satisfies CreateMessageOptions;
};
