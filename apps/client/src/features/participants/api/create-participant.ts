import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

type CreateParticipantOptions = MutationOptions<void, FirestoreError, void>;

export const createParticipantOptions = (groupId: string, callId: string) => {
  return {
    mutationFn: async () => {
      return setDoc(
        doc(
          db,
          "groups",
          groupId,
          "calls",
          callId,
          "participants",
          auth.currentUser!.uid
        ),
        {
          joinedAt: serverTimestamp(),
          isMuted: false,
          sessionId: window.crypto.randomUUID(),
        }
      );
    },
  } satisfies CreateParticipantOptions;
};

type UseCreateParticipantOptions = UseMutationOptions<
  void,
  FirestoreError,
  void
>;

export const useCreateParticipant = (
  groupId: string,
  callId: string,
  options?: Partial<UseCreateParticipantOptions>
) => {
  return useMutation({
    ...options,
    ...createParticipantOptions(groupId, callId),
  } satisfies UseCreateParticipantOptions);
};
