import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";

import { updateUserOptions } from "../api/update-user";
import { UpdateUserInput } from "../types/update-user";

type UseUpdateUserOptions = UseMutationOptions<
  void,
  FirestoreError,
  UpdateUserInput
>;

export const useUpdateUser = (options?: Partial<UseUpdateUserOptions>) => {
  return useMutation({
    ...options,
    ...updateUserOptions(),
  } satisfies UseUpdateUserOptions);
};
