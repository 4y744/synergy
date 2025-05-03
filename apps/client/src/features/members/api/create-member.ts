import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, setDoc } from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

export const createMemberInputSchema = z.object({
  inviteId: z.string(),
});

export type CreateMemberInput = z.infer<typeof createMemberInputSchema>;

type CreateMemberOptions = MutationOptions<
  void,
  FirestoreError,
  CreateMemberInput
>;

export const createMemberOptions = () => {
  return {
    mutationFn: async (data) => {
      const [groupId, inviteId] = data.inviteId.split("-");
      if (!groupId || !inviteId) {
        throw new Error();
      }
      await setDoc(
        doc(db, "groups", groupId, "members", auth.currentUser!.uid),
        {
          inviteId,
          uid: auth.currentUser!.uid,
        }
      );
    },
  } satisfies CreateMemberOptions;
};

type UseCreateMemberOptions = UseMutationOptions<
  void,
  FirestoreError,
  CreateMemberInput
>;

export const useCreateMember = (options?: Partial<UseCreateMemberOptions>) => {
  return useMutation({
    ...options,
    ...createMemberOptions(),
  } satisfies UseCreateMemberOptions);
};
