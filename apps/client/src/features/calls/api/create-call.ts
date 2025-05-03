import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const createCallInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type CreateCallInput = z.infer<typeof createCallInputSchema>;

type CreateCallOptions = MutationOptions<
  string,
  FirestoreError,
  CreateCallInput
>;

export const createCallOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const { id: callId } = await addDoc(
        collection(db, "groups", groupId, "calls"),
        {
          ...data,
          createdAt: serverTimestamp(),
        }
      );
      return callId;
    },
  } satisfies CreateCallOptions;
};

type UseCreateCallOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateCallInput
>;

export const useCreateCall = (
  groupId: string,
  options?: Partial<UseCreateCallOptions>
) => {
  return useMutation({
    ...options,
    ...createCallOptions(groupId),
  } satisfies UseCreateCallOptions);
};
