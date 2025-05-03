import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteMessageOptions = MutationOptions<void, FirestoreError, void>;

export const deleteMessageOptions = (
  groupId: string,
  chatId: string,
  messageId: string
) => {
  return {
    mutationFn: () => {
      return updateDoc(
        doc(db, "groups", groupId, "chats", chatId, "messages", messageId),
        {
          payload: "__deleted__",
        }
      );
    },
  } satisfies DeleteMessageOptions;
};

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
