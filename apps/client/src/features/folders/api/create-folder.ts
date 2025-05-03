import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const createFolderInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type CreateFolderInput = z.infer<typeof createFolderInputSchema>;

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

type UseCreateFolderOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateFolderInput
>;

export const useCreateFolder = (
  groupId: string,
  options?: Partial<UseCreateFolderOptions>
) => {
  return useMutation({
    ...options,
    ...createFolderOptions(groupId),
  } satisfies UseCreateFolderOptions);
};
