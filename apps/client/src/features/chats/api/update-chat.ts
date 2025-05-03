import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const updateChatInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type UpdateChatInput = z.infer<typeof updateChatInputSchema>;

type UpdateChatOptions = MutationOptions<void, FirestoreError, UpdateChatInput>;

export const updateChatOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: (data) => {
      return updateDoc(doc(db, "groups", groupId, "chats", chatId), data);
    },
  } satisfies UpdateChatOptions;
};

type UseUpdateChatOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateChatInput
>;

export const useUpdateChat = (
  groupId: string,
  chatId: string,
  options?: Partial<UseUpdateChatOptions>
) => {
  return useMutation({
    ...options,
    ...updateChatOptions(groupId, chatId),
  } satisfies UseUpdateChatOptions);
};
