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

export const createMessageInputSchema = z.object({
  payload: z.string().min(1),
});

export type CreateMessageInput = z.infer<typeof createMessageInputSchema>;

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

type UseCreateMessageOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateMessageInput
>;

export const useCreateMessage = (
  groupId: string,
  chatId: string,
  options?: Partial<UseCreateMessageOptions>
) => {
  return useMutation({
    ...options,
    ...createMessageOptions(groupId, chatId),
  } satisfies UseCreateMessageOptions);
};
