import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createMessageMutationOptions } from "../api/create-message";
import { NewMessage } from "../types/message";

export type UseCreateMessageMutationOptions = UseMutationOptions<
  string,
  FirestoreError,
  NewMessage
>;

export const useCreateMessage = (
  groupId: string,
  chatId: string,
  options?: Partial<UseCreateMessageMutationOptions>
) => {
  return useMutation({
    ...options,
    ...createMessageMutationOptions(groupId, chatId),
  });
};
