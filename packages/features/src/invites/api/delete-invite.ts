import { db } from "@synergy/libs/firebase";
import { MutationOptions } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";

const deleteInvite = async (groupId: string, inviteId: string) => {
  await deleteDoc(doc(db, "groups", groupId, "invites", inviteId));
};

type DeleteInviteOptions = MutationOptions<void, FirebaseStorage, string>;

export const deleteInviteOptions = (groupId: string) => {
  return {
    mutationFn: (inviteId) => deleteInvite(groupId, inviteId),
  } satisfies DeleteInviteOptions;
};
