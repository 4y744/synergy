import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteMemberOptions = MutationOptions<void, FirestoreError, void>;

export const deleteMemberOptions = (groupId: string, memberId: string) => {
  return {
    mutationFn: async () => {
      // Deleting a user is done by setting their "uid" field to an empty string.
      // This circumvents an issue where onSnapshot isn't called when a document is a query was deleted.
      return updateDoc(doc(db, "groups", groupId, "members", memberId), {
        uid: "",
      });
    },
  } satisfies DeleteMemberOptions;
};

type UseDeleteMemberOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteMember = (
  groupId: string,
  memberId: string,
  options?: Partial<UseDeleteMemberOptions>
) => {
  return useMutation({
    ...options,
    ...deleteMemberOptions(groupId, memberId),
  } satisfies UseDeleteMemberOptions);
};
