import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { updateFolderOptions } from "../api/update-folder";
import { UpdateFolderInput } from "../types/update-folder";

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
