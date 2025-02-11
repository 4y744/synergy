import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { FirestoreError } from "firebase/firestore";

import { updateGroupOptions } from "../api/update-group";
import { UpdateGroupInput } from "../types/update-group";

type UseUpdateGroupOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateGroupInput
>;

export const useUpdateGroup = (
  groupId: string,
  options?: Partial<UseUpdateGroupOptions>
) => {
  return useMutation({
    ...options,
    ...updateGroupOptions(groupId),
  } satisfies UseUpdateGroupOptions);
};
