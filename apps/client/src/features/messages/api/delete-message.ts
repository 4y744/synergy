import { MutationOptions } from "@tanstack/react-query";
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
