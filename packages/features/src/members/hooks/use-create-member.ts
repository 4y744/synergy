import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createMemberOptions } from "../api/create-member";
import { CreateMemberInput } from "../types/create-member";

type UseCreateMemberOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateMemberInput
>;

export const useCreateMember = (options?: Partial<UseCreateMemberOptions>) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    ...createMemberOptions(queryClient),
  } satisfies UseCreateMemberOptions);
};
