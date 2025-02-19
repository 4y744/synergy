import { MutationOptions } from "@tanstack/react-query";

import { deleteDoc, doc } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";

import { db } from "@synergy/libs/firebase";

const deleteInvite = (groupId: string, inviteId: string) => {
  return deleteDoc(doc(db, "groups", groupId, "invites", inviteId));
};

type DeleteInviteOptions = MutationOptions<void, FirebaseStorage, void>;

export const deleteInviteOptions = (groupId: string, inviteId: string) => {
  return {
    mutationFn: () => deleteInvite(groupId, inviteId),
  } satisfies DeleteInviteOptions;
};
