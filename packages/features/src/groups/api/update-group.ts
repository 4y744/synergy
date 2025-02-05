import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import { MutationOptions } from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";

import { UpdateGroupInput } from "../types/update-group";

const updateGroup = (groupId: string, data: UpdateGroupInput) => {
  return updateDoc(doc(db, "groups", groupId), data);
};

type UpdateGroupOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateGroupInput
>;

export const updateGroupOptions = (groupId: string) => {
  return {
    mutationFn: (data) => updateGroup(groupId, data),
  } satisfies UpdateGroupOptions;
};
