import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { updateChatOptions } from "../api/update-chat";
import { UpdateChatInput } from "../types/update-chat";

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
