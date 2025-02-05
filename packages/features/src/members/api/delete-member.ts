import { MutationOptions } from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

const deleteMember = (groupId: string, memberId: string) => {
  return deleteDoc(doc(db, "groups", groupId, "members", memberId));
};

type DeleteMemberOptions = MutationOptions<void, FirestoreError, void>;

export const deleteMemberOptions = (groupId: string, memberId: string) => {
  return {
    mutationFn: () => deleteMember(groupId, memberId),
  } satisfies DeleteMemberOptions;
};
