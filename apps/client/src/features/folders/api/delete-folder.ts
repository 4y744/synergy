import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
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

type UseDeleteFolderOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteFolder = (
  groupId: string,
  folderId: string,
  options?: Partial<UseDeleteFolderOptions>
) => {
  return useMutation({
    ...options,
    ...deleteFolderOptions(groupId, folderId),
  } satisfies UseDeleteFolderOptions);
};
