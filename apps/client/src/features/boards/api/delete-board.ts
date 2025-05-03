import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteBoardOptions = MutationOptions<void, FirestoreError, void>;

export const deleteBoardOptions = (groupId: string, boardId: string) => {
  return {
    mutationFn: () => deleteDoc(doc(db, "groups", groupId, "boards", boardId)),
  } satisfies DeleteBoardOptions;
};

type UseDeleteBoardOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteBoard = (
  groupId: string,
  boardId: string,
  options?: Partial<UseDeleteBoardOptions>
) => {
  return useMutation({
    ...options,
    ...deleteBoardOptions(groupId, boardId),
  } satisfies UseDeleteBoardOptions);
};
