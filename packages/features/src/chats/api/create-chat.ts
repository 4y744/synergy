import { MutationOptions } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { CreateChatInput } from "../types/create-chat";

const createChat = async (groupId: string, data: CreateChatInput) => {
  const { id: chatId } = await addDoc(
    collection(db, "groups", groupId, "chats"),
    {
      ...data,
      createdAt: serverTimestamp(),
    }
  );
  await addDoc(collection(db, "groups", groupId, "chats", chatId, "messages"), {
    createdAt: serverTimestamp(),
    payload: "__init__",
    createdBy: auth.currentUser!.uid,
  });
  return chatId;
};

type CreateChatOptions = MutationOptions<
  string,
  FirestoreError,
  CreateChatInput
>;

export const createChatOptions = (groupId: string) => {
  return {
    mutationFn: (data) => createChat(groupId, data),
  } satisfies CreateChatOptions;
};
