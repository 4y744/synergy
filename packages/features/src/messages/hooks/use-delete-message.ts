import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { deleteMessageOptions } from "../api/delete-message";

type UseDeleteMessageOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteMessage = (
  groupId: string,
  chatId: string,
  messageId: string,
  options?: Partial<UseDeleteMessageOptions>
) => {
  return useMutation({
    ...options,
    ...deleteMessageOptions(groupId, chatId, messageId),
  } satisfies UseDeleteMessageOptions);
};
