import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createChatOptions } from "../api/create-chat";
import { CreateChatInput } from "../types/create-chat";

type UseCreateChatOptions = UseMutationOptions<
  void,
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
