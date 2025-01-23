import { MutationOptions } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { NewMessage } from "../types/message";

const createMessage = async (
  groupId: string,
  chatId: string,
  payload: string
) => {
  const { id } = await addDoc(
    collection(db, "groups", groupId, "chats", chatId, "messages"),
    {
      createdAt: serverTimestamp(),
      payload,
      createdBy: auth.currentUser!.uid,
    }
  );
  return id;
};

type CreateMessageOptions = MutationOptions<string, FirestoreError, NewMessage>;

export const createMessageOptions = (groupId: string, chatId: string) => {
  return {
    mutationFn: ({ payload }) => {
      return createMessage(groupId, chatId, payload);
    },
  } satisfies CreateMessageOptions;
};
