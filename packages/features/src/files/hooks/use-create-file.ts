import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { createFileOptions } from "../api/create-file";
import { CreateFileInput } from "../types/create-file";

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
