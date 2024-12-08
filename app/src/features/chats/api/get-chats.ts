import { db } from "@/libs/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { Chat, ChatSchema } from "../types/chat";
import { UseQueryOptions } from "@tanstack/react-query";

export const getChats = async (
  groupId: string,
  options?: {
    forEach?: (chat: Chat) => void;
  }
) => {
  const { docs: chatDocs } = await getDocs(
    query(collection(db, "groups", groupId, "chats"))
  );
  const chats = chatDocs.map((doc) => {
    const data = doc.data();
    const chat = ChatSchema.parse({
      id: doc.id,
      name: data?.name,
      created: new Date(data?.created.seconds),
    });
    options?.forEach?.(chat);
    return chat;
  });
  return chats;
};

export const getChatsQueryOptions = (
  groupId: string,
  options?: {
    forEach?: (chat: Chat) => void;
  }
) => {
  return {
    queryKey: ["groups", groupId, "chats"],
    queryFn: () => getChats(groupId, options),
  } satisfies UseQueryOptions;
};
