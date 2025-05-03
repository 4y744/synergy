import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, updateDoc } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const updateBoardInputSchema = z.object({
  name: z.string().min(4).max(32),
});

export type UpdateBoardInput = z.infer<typeof updateBoardInputSchema>;

type UpdateBoardOptions = MutationOptions<
  void,
  FirestoreError,
  UpdateBoardInput
>;

export const updateBoardOptions = (groupId: string, boardId: string) => {
  return {
    mutationFn: (data) => {
      return updateDoc(doc(db, "groups", groupId, "boards", boardId), data);
    },
  } satisfies UpdateBoardOptions;
};

type UseUpdateBoardOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateBoardInput
>;

export const useUpdateBoard = (
  groupId: string,
  boardId: string,
  options?: Partial<UseUpdateBoardOptions>
) => {
  return useMutation({
    ...options,
    ...updateBoardOptions(groupId, boardId),
  } satisfies UseUpdateBoardOptions);
};
