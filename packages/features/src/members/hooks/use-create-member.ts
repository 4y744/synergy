import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";
import { createMemberOptions } from "../api/create-member";
import { NewMember } from "../types/member";

export type UseCreateMemberOptions = UseMutationOptions<
  string,
  FirestoreError,
  NewMember
>;

export const useCreateMember = (options?: Partial<UseCreateMemberOptions>) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    ...createMemberOptions(queryClient),
  } satisfies UseCreateMemberOptions);
};
