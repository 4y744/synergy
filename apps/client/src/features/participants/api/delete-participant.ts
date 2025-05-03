import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError, updateDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

type DeleteParticipantOptions = MutationOptions<void, FirestoreError, string>;

export const deleteParticipantOptions = (groupId: string, callId: string) => {
  return {
    mutationFn: async () => {
      const docRef = doc(
        db,
        "groups",
        groupId,
        "calls",
        callId,
        "participants",
        auth.currentUser!.uid
      );
      await deleteDoc(docRef);
      return updateDoc(docRef, {});
    },
  } satisfies DeleteParticipantOptions;
};

type UseDeleteParticipantOptions = UseMutationOptions<
  void,
  FirestoreError,
  void
>;

export const useDeleteParticipant = (
  groupId: string,
  callId: string,
  options?: Partial<UseDeleteParticipantOptions>
) => {
  return useMutation({
    ...options,
    ...deleteParticipantOptions(groupId, callId),
  } satisfies UseDeleteParticipantOptions);
};
