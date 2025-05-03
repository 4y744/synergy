import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

export const createChatInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type CreateChatInput = z.infer<typeof createChatInputSchema>;

type CreateChatOptions = MutationOptions<
  string,
  FirestoreError,
  CreateChatInput
>;

export const createChatOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const { id: chatId } = await addDoc(
        collection(db, "groups", groupId, "chats"),
        {
          ...data,
          createdAt: serverTimestamp(),
        }
      );
      await addDoc(
        collection(db, "groups", groupId, "chats", chatId, "messages"),
        {
          createdAt: serverTimestamp(),
          payload: "__init__",
          createdBy: auth.currentUser!.uid,
        }
      );
      return chatId;
    },
  } satisfies CreateChatOptions;
};

type UseCreateChatOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateChatInput
>;

export const useCreateChat = (
  groupId: string,
  options?: Partial<UseCreateChatOptions>
) => {
  return useMutation({
    ...options,
    ...createChatOptions(groupId),
  } satisfies UseCreateChatOptions);
};
