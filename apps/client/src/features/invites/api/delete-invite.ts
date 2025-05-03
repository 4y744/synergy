import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteInviteOptions = MutationOptions<void, FirestoreError, void>;

export const deleteInviteOptions = (groupId: string, inviteId: string) => {
  return {
    mutationFn: () => {
      return deleteDoc(doc(db, "groups", groupId, "invites", inviteId));
    },
  } satisfies DeleteInviteOptions;
};

type UseDeleteInviteOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteInvite = (
  groupId: string,
  inviteId: string,
  options?: Partial<UseDeleteInviteOptions>
) => {
  return useMutation({
    ...options,
    ...deleteInviteOptions(groupId, inviteId),
  } satisfies UseDeleteInviteOptions);
};
