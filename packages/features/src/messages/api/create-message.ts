import { db } from "@synergy/libs/firebase";
import { MutationOptions } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import { NewMessage } from "../types/message";

const createMessage = async (
  groupId: string,
  chatId: string,
  payload: string,
  createdBy: string
) => {
  const { id } = await addDoc(
    collection(db, "groups", groupId, "chats", chatId, "messages"),
    {
      createdAt: serverTimestamp(),
      payload,
      createdBy,
    }
  );
  return id;
};

type CreateMessageOptions = MutationOptions<string, FirestoreError, NewMessage>;

export const createMessageOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: ({ payload, createdBy }) => {
      return createMessage(groupId, chatId, payload, createdBy);
    },
  } satisfies CreateMessageOptions;
};
