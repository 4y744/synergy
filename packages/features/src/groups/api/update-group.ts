import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { MutationOptions } from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";

import { UpdateGroup } from "../types/update-group";

const updateGroup = async (delta: UpdateGroup) => {
  const { id, ...rest } = delta;
  await updateDoc(doc(db, "groups", id), rest);
};

type UpdateGroupOptions = MutationOptions<void, FirestoreError, UpdateGroup>;

export const updateGroupOptions = () => {
  return {
    mutationFn: async (delta) => {
      await updateGroup(delta);
    },
  } satisfies UpdateGroupOptions;
};
