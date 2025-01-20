import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createInviteOptions } from "../api/create-invite";
import { NewInvite } from "../types/invite";

export type UseCreateInviteOptions = UseMutationOptions<
  string,
  FirestoreError,
  NewInvite
>;

export const useCreateInvite = (
  groupId: string,
  options?: Partial<UseCreateInviteOptions>
) => {
  return useMutation({
    ...options,
    ...createInviteOptions(groupId),
  } satisfies UseCreateInviteOptions);
};
