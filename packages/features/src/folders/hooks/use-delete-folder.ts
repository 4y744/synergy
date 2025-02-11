import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { deleteFolderOptions } from "../api/delete-folder";

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
