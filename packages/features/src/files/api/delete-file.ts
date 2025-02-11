import { MutationOptions } from "@tanstack/react-query";

import { deleteDoc, doc, FirestoreError, getDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

import { db, storage } from "@synergy/libs/firebase";

const deleteFile = async (
  groupId: string,
  folderId: string,
  fileId: string
) => {
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
  await deleteDoc(fileDocRef);
  return deleteObject(ref(storage, fileDoc.data()?.url));
};

type DeleteFileOptions = MutationOptions<void, FirestoreError, void>;

export const deleteFileOptions = (
  groupId: string,
  folderId: string,
  fileId: string
) => {
  return {
    mutationFn: () => deleteFile(groupId, folderId, fileId),
  } satisfies DeleteFileOptions;
};
