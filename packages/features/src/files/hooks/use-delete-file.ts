import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { deleteFileOptions } from "../api/delete-file";

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
