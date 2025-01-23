import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { createGroupOptions } from "../api/create-group";
import { NewGroup } from "../types/new-group";

type UseCreateGroupOptions = UseMutationOptions<
  string,
  FirestoreError,
  NewGroup
>;

export const useCreateGroup = (options?: Partial<UseCreateGroupOptions>) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...options,
    ...createGroupOptions(queryClient),
  } satisfies UseCreateGroupOptions);
  return { ...mutation };
};
