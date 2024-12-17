import { MutationOptions } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ChatSchema, NewChat } from "../types/chat";
import { db } from "@/libs/firebase";

export const createChat = async (groupId: string, name: string) => {
  const { id: chatId } = await addDoc(
    collection(db, "groups", groupId, "chats"),
    {
      name,
      created: serverTimestamp(),
    }
  );
  const chatDoc = await getDoc(doc(db, "groups", groupId, "chats", chatId));
  const data = chatDoc.data();
  const chat = ChatSchema.parse({
    id: chatDoc.id,
    name: data?.name,
    created: new Date(data?.created.seconds),
  });
  return chat;
};

export type CreateChatMutationOptions = MutationOptions<
  NewChat,
  FirestoreError,
  NewChat
>;

export const CreateChatMutationOptions = (groupId: string) => {
  return {
    mutationFn: ({ name }) => createChat(groupId, name),
  } satisfies CreateChatMutationOptions;
};
