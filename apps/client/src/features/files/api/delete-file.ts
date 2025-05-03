import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

import { deleteDoc, doc, FirestoreError, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { db, storage } from "@synergy/libs/firebase";

type DeleteFileOptions = MutationOptions<void, FirestoreError, void>;

export const deleteFileOptions = (
  groupId: string,
  folderId: string,
  fileId: string
) => {
  return {
    mutationFn: async () => {
      const fileDocRef = doc(
        db,
        "groups",
        groupId,
        "folders",
        folderId,
        "files",
        fileId
      );
      const fileDoc = await getDoc(fileDocRef);
      await deleteObject(ref(storage, fileDoc.data()?.url));
      return deleteDoc(fileDocRef);
    },
  } satisfies DeleteFileOptions;
};

type UseDeleteFileOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteFile = (
  groupId: string,
  folderId: string,
  fileId: string,
  options?: Partial<UseDeleteFileOptions>
) => {
  return useMutation({
    ...options,
    ...deleteFileOptions(groupId, folderId, fileId),
  } satisfies UseDeleteFileOptions);
};
