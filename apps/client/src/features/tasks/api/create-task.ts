import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  addDoc,
  collection,
  FirestoreError,
  serverTimestamp,
} from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

export const createTaskInputSchema = z.object({
  name: z.string().min(4).max(32),
  description: z.string().max(300),
  assignedTo: z.string().array(),
});

export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

type CreateTaskOptions = MutationOptions<
  string,
  FirestoreError,
  CreateTaskInput
>;

export const createTaskOptions = (groupId: string, boardId: string) => {
  return {
    mutationFn: async (data) => {
      const { id } = await addDoc(
        collection(db, "groups", groupId, "boards", boardId, "tasks"),
        {
          ...data,
          createdAt: serverTimestamp(),
          createdBy: auth.currentUser!.uid,
        }
      );
      return id;
    },
  } satisfies CreateTaskOptions;
};

type UseCreateTaskOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateTaskInput
>;

export const useCreateTask = (
  groupId: string,
  chatId: string,
  options?: Partial<UseCreateTaskOptions>
) => {
  return useMutation({
    ...options,
    ...createTaskOptions(groupId, chatId),
  } satisfies UseCreateTaskOptions);
};
