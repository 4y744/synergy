import { MutationOptions } from "@tanstack/react-query";

import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteGroupOptions = MutationOptions<void, FirestoreError, void>;

export const deleteGroupOptions = (groupId: string) => {
  return {
    mutationFn: async () => {
      // Find and delete all members.
      const { docs: memberDocs } = await getDocs(
        collection(db, "groups", groupId, "members")
      );
      await Promise.all(
        memberDocs.map(async ({ id: memberId }) => {
          return deleteDoc(doc(db, "groups", groupId, "members", memberId));
        })
      );
      // Find and delete all invites.
      const { docs: inviteDocs } = await getDocs(
        collection(db, "groups", groupId, "invites")
      );
      await Promise.all(
        inviteDocs.map(({ id: inviteId }) => {
          return deleteDoc(doc(db, "groups", groupId, "invites", inviteId));
        })
      );
      // The rest of the subcollections remain,
      // as Firestore doesn't provide a convenient way to mass delete.
      // They should not cause any issues though.

      // Finally, delete the group doc.
      return deleteDoc(doc(db, "groups", groupId));
    },
  } satisfies DeleteGroupOptions;
};
