import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { deleteGroupOptions } from "../api/delete-group";

type UseDeleteGroupOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteGroup = (
  groupId: string,
  options?: Partial<UseDeleteGroupOptions>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    ...deleteGroupOptions(queryClient, groupId),
  } satisfies UseDeleteGroupOptions);
};
