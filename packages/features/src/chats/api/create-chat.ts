import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { MutationOptions } from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";

import { Chat, ChatSchema, NewChat } from "../types/chat";

export const createChat = async (
  groupId: string,
  name: string,
  createdBy: string
) => {
  const { id: chatId } = await addDoc(
    collection(db, "groups", groupId, "chats"),
    {
      name,
      created: serverTimestamp(),
    }
  );
  await addDoc(collection(db, "groups", groupId, "chats", chatId, "messages"), {
    created: serverTimestamp(),
    payload: "Welcome to my chat!",
    createdBy,
  });
  const chatDoc = await getDoc(doc(db, "groups", groupId, "chats", chatId));
  const data = chatDoc.data({ serverTimestamps: "estimate" });
  return ChatSchema.parse({
    id: chatDoc.id,
    name: data?.name,
    created: data?.created.toDate(),
  });
};

export type CreateChatOptions = MutationOptions<Chat, FirestoreError, NewChat>;

export const createChatOptions = (groupId: string) => {
  return {
    mutationFn: ({ name, createdBy }) => createChat(groupId, name, createdBy),
  } satisfies CreateChatOptions;
};
