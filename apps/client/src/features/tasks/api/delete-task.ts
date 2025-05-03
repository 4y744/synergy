import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { deleteDoc, doc, FirestoreError } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

type DeleteTaskOptions = MutationOptions<void, FirestoreError, void>;

export const deleteTaskOptions = (
  groupId: string,
  boardId: string,
  taskId: string
) => {
  return {
    mutationFn: () => {
      return deleteDoc(
        doc(db, "groups", groupId, "boards", boardId, "tasks", taskId)
      );
    },
  } satisfies DeleteTaskOptions;
};

type UseDeleteTaskOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteTask = (
  groupId: string,
  boardId: string,
  taskId: string,
  options?: Partial<UseDeleteTaskOptions>
) => {
  return useMutation({
    ...options,
    ...deleteTaskOptions(groupId, boardId, taskId),
  } satisfies UseDeleteTaskOptions);
};
