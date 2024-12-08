import { db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ChatSchema } from "../types/chat";
import { UseQueryOptions } from "@tanstack/react-query";

export const getChat = async (groupId: string, chatId: string) => {
  const chatDoc = await getDoc(doc(db, "groups", groupId, "chats", chatId));
  const data = chatDoc.data();
  const chat = ChatSchema.parse({
    id: chatDoc.id,
    name: data?.name,
    created: new Date(data?.created.seconds),
  });
  return chat;
};

export const getChatQueryOptions = (groupId: string, chatId: string) => {
  return {
    queryKey: ["groups", groupId, "chats", chatId],
    queryFn: () => getChat(groupId, chatId),
  } satisfies UseQueryOptions;
};
