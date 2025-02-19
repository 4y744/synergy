import { MutationOptions } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { CreateMessageInput } from "../types/create-message";

const createMessage = async (
  groupId: string,
  chatId: string,
  data: CreateMessageInput
) => {
  const { id } = await addDoc(
    collection(db, "groups", groupId, "chats", chatId, "messages"),
    {
      ...data,
      createdAt: serverTimestamp(),
      createdBy: auth.currentUser!.uid,
    }
  );
  return id;
};

type CreateMessageOptions = MutationOptions<
  string,
  FirestoreError,
  CreateMessageInput
>;

export const createMessageOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: (data) => createMessage(groupId, chatId, data),
  } satisfies CreateMessageOptions;
};
