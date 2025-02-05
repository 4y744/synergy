import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import { MutationOptions } from "@tanstack/react-query";

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
    payload: "Welcome to my chat!",
    createdBy: auth.currentUser!.uid,
  });
};

type CreateChatOptions = MutationOptions<void, FirestoreError, CreateChatInput>;

export const createChatOptions = (groupId: string) => {
  return {
    mutationFn: (data) => createChat(groupId, data),
  } satisfies CreateChatOptions;
};
