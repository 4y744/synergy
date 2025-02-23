import { MutationOptions } from "@tanstack/react-query";
import { collection, doc, FirestoreError, setDoc } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { CreateInviteInput } from "../types/create-invite";

type CreateInviteOptions = MutationOptions<
  string,
  FirestoreError,
  CreateInviteInput
>;

export const createInviteOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const inviteDocRef = doc(collection(db, "groups", groupId, "invites"));
      await setDoc(inviteDocRef, {
        ...data,
        inviteId: inviteDocRef.id,
      });
      return inviteDocRef.id;
    },
  } satisfies CreateInviteOptions;
};
