import { MutationOptions } from "@tanstack/react-query";

import { doc, FirestoreError, updateDoc } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { UpdateFolderInput } from "../types/update-folder";

const updateFolder = (
  groupId: string,
  folderId: string,
  data: UpdateFolderInput
) => {
  return updateDoc(doc(db, "groups", groupId, "folders", folderId), data);
};

type UpdateFolderOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateFolderInput
>;

export const updateFolderOptions = (groupId: string, folderId: string) => {
  return {
    mutationFn: (data) => updateFolder(groupId, folderId, data),
  } satisfies UpdateFolderOptions;
};
