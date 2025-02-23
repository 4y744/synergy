import { MutationOptions } from "@tanstack/react-query";

import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteFolderOptions = MutationOptions<void, FirestoreError, void>;

export const deleteFolderOptions = (groupId: string, folderId: string) => {
  return {
    mutationFn: () => {
      return deleteDoc(doc(db, "groups", groupId, "folders", folderId));
    },
  } satisfies DeleteFolderOptions;
};
