import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { deleteMemberOptions } from "../api/delete-member";

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
