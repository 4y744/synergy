import { MutationOptions } from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { db, storage } from "@synergy/libs/firebase";

import { UpdateGroupInput } from "../types/update-group";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

type UpdateGroupOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateGroupInput
>;

export const updateGroupOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const groupDocRef = doc(db, "groups", groupId);
      if (data.icon) {
        const { ref: pfpRef } = await uploadBytes(
          ref(storage, `/groups/${groupId}/icon`),
          data.icon
        );
        const url = await getDownloadURL(pfpRef);
        await updateDoc(groupDocRef, {
          name: data.name,
          icon: url,
        });
      } else {
        await updateDoc(groupDocRef, { name: data.name });
      }
    },
  } satisfies UpdateGroupOptions;
};
