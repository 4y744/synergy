import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createGroupOptions } from "../api/create-group";
import { CreateGroupInput } from "../types/create-group";

type UseCreateGroupOptions = UseMutationOptions<
  string,
  FirestoreError,
  CreateGroupInput
>;

export const useCreateGroup = (options?: Partial<UseCreateGroupOptions>) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    ...createGroupOptions(queryClient),
  } satisfies UseCreateGroupOptions);
};
