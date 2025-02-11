import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { createMessageOptions } from "../api/create-message";
import { CreateMessageInput } from "../types/create-message";

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
