import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const updateFolderInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type UpdateFolderInput = z.infer<typeof updateFolderInputSchema>;

type UpdateFolderOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateFolderInput
>;

export const updateFolderOptions = (groupId: string, folderId: string) => {
  return {
    mutationFn: (data) => {
      return updateDoc(doc(db, "groups", groupId, "folders", folderId), data);
    },
  } satisfies UpdateFolderOptions;
};

type UseUpdateFolderOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateFolderInput
>;

export const useUpdateFolder = (
  groupId: string,
  folderId: string,
  options?: Partial<UseUpdateFolderOptions>
) => {
  return useMutation({
    ...options,
    ...updateFolderOptions(groupId, folderId),
  } satisfies UseUpdateFolderOptions);
};
