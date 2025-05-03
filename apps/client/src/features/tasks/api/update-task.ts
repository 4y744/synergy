import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const updateTaskInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

type UpdateTaskOptions = MutationOptions<void, FirestoreError, UpdateTaskInput>;

export const updateTaskOptions = (
  groupId: string,
  boardId: string,
  taskId: string
) => {
  return {
    mutationFn: (data) => {
      return updateDoc(
        doc(db, "groups", groupId, "boards", boardId, "tasks", taskId),
        data
      );
    },
  } satisfies UpdateTaskOptions;
};

type UseUpdateTaskOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateTaskInput
>;

export const useUpdateTask = (
  groupId: string,
  boardId: string,
  taskId: string,
  options?: Partial<UseUpdateTaskOptions>
) => {
  return useMutation({
    ...options,
    ...updateTaskOptions(groupId, boardId, taskId),
  } satisfies UseUpdateTaskOptions);
};
