import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";
import { deleteInviteOptions } from "../api/delete-invite";

type UseDeleteInviteOptions = UseMutationOptions<void, FirestoreError, string>;

export const useDeleteInvite = (
  groupId: string,
  options?: Partial<UseDeleteInviteOptions>
) => {
  return useMutation({
    ...options,
    ...deleteInviteOptions(groupId),
  });
};
