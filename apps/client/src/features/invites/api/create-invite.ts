import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { addDoc, collection, FirestoreError } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const createInviteInputSchema = z.object({
  expiresIn: z.number(),
});

export type CreateInviteInput = z.infer<typeof createInviteInputSchema>;

type CreateInviteOptions = MutationOptions<
  string,
  FirestoreError,
  CreateInviteInput
>;

export const createInviteOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const { id } = await addDoc(
        collection(db, "groups", groupId, "invites"),
        {
          expiresAt: new Date(Date.now() + data.expiresIn),
        }
      );
      return id;
    },
  } satisfies CreateInviteOptions;
};

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
