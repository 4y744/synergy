import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { deleteChatOptions } from "../api/delete-chat";

type UseDeleteChatOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteChat = (
  groupId: string,
  chatId: string,
  options?: Partial<UseDeleteChatOptions>
) => {
  return useMutation({
    ...options,
    ...deleteChatOptions(groupId, chatId),
  } satisfies UseDeleteChatOptions);
};
