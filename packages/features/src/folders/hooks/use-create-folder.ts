import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { createFolderOptions } from "../api/create-folder";
import { CreateFolderInput } from "../types/create-folder";

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
