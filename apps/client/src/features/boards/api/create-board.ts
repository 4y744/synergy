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

import { db } from "@synergy/libs/firebase";

export const createBoardInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type CreateBoardInput = z.infer<typeof createBoardInputSchema>;

type CreateBoardOptions = MutationOptions<
  string,
  FirestoreError,
  CreateBoardInput
>;

export const createBoardOptions = (groupId: string) => {
  return {
    mutationFn: async (data) => {
      const { id: boardId } = await addDoc(
        collection(db, "groups", groupId, "boards"),
        {
          ...data,
          createdAt: serverTimestamp(),
        }
      );
      return boardId;
    },
  } satisfies CreateBoardOptions;
};

type UseCreateBoardOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateBoardInput
>;

export const useCreateBoard = (
  groupId: string,
  options?: Partial<UseCreateBoardOptions>
) => {
  return useMutation({
    ...options,
    ...createBoardOptions(groupId),
  } satisfies UseCreateBoardOptions);
};
