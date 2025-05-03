import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const updateCallInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type UpdateCallInput = z.infer<typeof updateCallInputSchema>;

type UpdateCallOptions = MutationOptions<void, FirestoreError, UpdateCallInput>;

export const updateCallOptions = (groupId: string, callId: string) => {
  return {
    mutationFn: (data) => {
      return updateDoc(doc(db, "groups", groupId, "calls", callId), data);
    },
  } satisfies UpdateCallOptions;
};

type UseUpdateCallOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateCallInput
>;

export const useUpdateCall = (
  groupId: string,
  callId: string,
  options?: Partial<UseUpdateCallOptions>
) => {
  return useMutation({
    ...options,
    ...updateCallOptions(groupId, callId),
  } satisfies UseUpdateCallOptions);
};
