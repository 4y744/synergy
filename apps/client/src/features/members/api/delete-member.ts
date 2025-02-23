import { MutationOptions } from "@tanstack/react-query";

import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteMemberOptions = MutationOptions<void, FirestoreError, void>;

export const deleteMemberOptions = (groupId: string, memberId: string) => {
  return {
    mutationFn: () => {
      return deleteDoc(doc(db, "groups", groupId, "members", memberId));
    },
  } satisfies DeleteMemberOptions;
};
