import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import z from "zod";

import { auth, db, storage } from "@synergy/libs/firebase";

export const createFileInputSchema = z.instanceof(File);

export type CreateFileInput = z.infer<typeof createFileInputSchema>;

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
    mutationFn: async (data) => {
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
    },
  } satisfies CreateFileOptions;
};

type UseCreateFileOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateFileInput
>;

export const useCreateFile = (
  groupId: string,
  chatId: string,
  options?: Partial<UseCreateFileOptions> & {
    onProgressChange?: (percentage: number) => void;
  }
) => {
  return useMutation({
    ...options,
    ...createFileOptions(groupId, chatId, {
      onProgressChange: options?.onProgressChange,
    }),
  } satisfies UseCreateFileOptions);
};
