import { MutationOptions } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { FirebaseStorage } from "firebase/storage";

import { db } from "@synergy/libs/firebase";

type DeleteInviteOptions = MutationOptions<void, FirebaseStorage, void>;

export const deleteInviteOptions = (groupId: string, inviteId: string) => {
  return {
    mutationFn: () => {
      return deleteDoc(doc(db, "groups", groupId, "invites", inviteId));
    },
  } satisfies DeleteInviteOptions;
};
