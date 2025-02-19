import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { createInviteOptions } from "../api/create-invite";
import { CreateInviteInput } from "../types/create-invite";

type UseCreateInviteOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateInviteInput
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
