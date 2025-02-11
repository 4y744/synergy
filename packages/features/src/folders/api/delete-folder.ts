import { MutationOptions } from "@tanstack/react-query";

import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

const deleteFolder = (groupId: string, folderId: string) => {
  return deleteDoc(doc(db, "groups", groupId, "folders", folderId));
};

type DeleteFolderOptions = MutationOptions<void, FirestoreError, void>;

export const deleteFolderOptions = (groupId: string, folderId: string) => {
  return {
    mutationFn: () => deleteFolder(groupId, folderId),
  } satisfies DeleteFolderOptions;
};
