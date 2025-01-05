import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createChatMutationOptions } from "../api/create-chat";
import { Chat, NewChat } from "../types/chat";

export type UseCreateChatMutationOptions = UseMutationOptions<
  Chat,
  FirestoreError,
  NewChat
>;

export const useCreateChat = (
  groupId: string,
  options?: Partial<UseCreateChatMutationOptions>
) => {
  return useMutation({
    ...options,
    ...createChatMutationOptions(groupId),
  });
};
