import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { createChatMutationOptions } from "../api/create-chat";
import { NewChat } from "../types/chat";
import { FirestoreError } from "firebase/firestore";

export type UseCreateChatMutationOptions = UseMutationOptions<
  NewChat,
  FirestoreError,
  NewChat
>;

export const useCreateChat = (
  groupId: string,
  options?: UseCreateChatMutationOptions
) => {
  return useMutation({
    ...createChatMutationOptions(groupId),
    ...options,
  });
};
