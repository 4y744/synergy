import { MutationOptions } from "@tanstack/react-query";

import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { CreateFolderInput } from "../types/create-folder";

type CreateFolderOptions = MutationOptions<
  string,
  FirestoreError,
  CreateFolderInput
>;

export const createFolderOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const { id: folderId } = await addDoc(
        collection(db, "groups", groupId, "folders"),
        {
          ...data,
          createdAt: serverTimestamp(),
        }
      );
      return folderId;
    },
  } satisfies CreateFolderOptions;
};
