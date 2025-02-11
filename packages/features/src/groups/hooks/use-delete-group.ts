import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { deleteGroupOptions } from "../api/delete-group";

type UseDeleteGroupOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteGroup = (
  groupId: string,
  options?: Partial<UseDeleteGroupOptions>
) => {
  return useMutation({
    ...options,
    ...deleteGroupOptions(groupId),
  } satisfies UseDeleteGroupOptions);
};
