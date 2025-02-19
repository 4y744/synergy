import { MutationOptions } from "@tanstack/react-query";

import {
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { auth, db, storage } from "@synergy/libs/firebase";

import { CreateFileInput } from "../types/create-file";

const createFile = async (
  groupId: string,
  folderId: string,
  data: CreateFileInput,
  options?: {
    onProgressChange?: (progress: number) => void;
  }
) => {
  const fileDocRef = doc(
    collection(db, "groups", groupId, "folders", folderId, "files")
  );
  const uploadTask = uploadBytesResumable(
    ref(storage, `groups/${groupId}/folders/${folderId}/${fileDocRef.id}`),
    data
  );
  const unsubscribe = uploadTask.on("state_changed", (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
    options?.onProgressChange?.(progress);
  });
  const { ref: fileRef } = await uploadTask;
  unsubscribe();
  const url = await getDownloadURL(fileRef);
  await setDoc(fileDocRef, {
    name: data.name,
    url,
    createdAt: serverTimestamp(),
    createdBy: auth.currentUser!.uid,
  });
  return fileDocRef.id;
};

type CreateFileOptions = MutationOptions<
  string,
  FirestoreError,
  CreateFileInput
>;

export const createFileOptions = (
  groupId: string,
  folderId: string,
  options?: {
    onProgressChange?: (progress: number) => void;
  }
) => {
  return {
    mutationFn: (data) => createFile(groupId, folderId, data, options),
  } satisfies CreateFileOptions;
};
