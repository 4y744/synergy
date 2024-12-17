import { FirestoreError } from "firebase/firestore";
import { createGroupMutationOptions } from "./../api/create-group";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { NewGroup } from "../types/group";

export type UseCreateGroupMutationOptions = UseMutationOptions<
  string,
  FirestoreError,
  NewGroup
>;

export const useCreateGroup = (
  options?: Partial<UseCreateGroupMutationOptions>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    ...createGroupMutationOptions(queryClient),
  } satisfies UseCreateGroupMutationOptions);
};
