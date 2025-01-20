import { db } from "@synergy/libs/firebase";
import { MutationOptions } from "@tanstack/react-query";
import { collection, doc, FirestoreError, setDoc } from "firebase/firestore";
import { NewInvite } from "../types/invite";

export const createInvite = async (groupId: string, expiresAt: Date) => {
  const inviteDocRef = doc(collection(db, "groups", groupId, "invites"));
  await setDoc(inviteDocRef, {
    expiresAt,
    inviteId: inviteDocRef.id,
  });
  return inviteDocRef.id;
};

export type CreateInviteOptions = MutationOptions<
  string,
  FirestoreError,
  NewInvite
>;

export const createInviteOptions = (groupId: string) => {
  return {
    mutationFn: ({ expiresAt }) => {
      return createInvite(groupId, expiresAt);
    },
  } satisfies CreateInviteOptions;
};
