import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

export const updateParticipantInputSchema = z.object({
  isMuted: z.boolean(),
});

export type UpdateParticipantInput = z.infer<
  typeof updateParticipantInputSchema
>;

type UpdateParticipantOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateParticipantInput
>;

export const updateParticipantOptions = (groupId: string, callId: string) => {
  return {
    mutationFn: (data) => {
      return updateDoc(
        doc(
          db,
          "groups",
          groupId,
          "calls",
          callId,
          "participants",
          auth.currentUser!.uid
        ),
        data
      );
    },
  } satisfies UpdateParticipantOptions;
};

type UseUpdateParticipantOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateParticipantInput
>;

export const useUpdateParticipant = (
  groupId: string,
  callId: string,
  options?: Partial<UseUpdateParticipantOptions>
) => {
  return useMutation({
    ...options,
    ...updateParticipantOptions(groupId, callId),
  } satisfies UseUpdateParticipantOptions);
};
