import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createChatOptions } from "../api/create-chat";
import { Chat, NewChat } from "../types/chat";

type UseCreateChatOptions = UseMutationOptions<Chat, FirestoreError, NewChat>;

export const useCreateChat = (
  groupId: string,
  options?: Partial<UseCreateChatOptions>
) => {
  return useMutation({
    ...options,
    ...createChatOptions(groupId),
  } satisfies UseCreateChatOptions);
};
