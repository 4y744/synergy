import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { FirestoreError } from "firebase/firestore";
import { deleteUser } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

type DeleteUserOptions = MutationOptions<void, FirestoreError, void>;

export const deleteUserOptions = () => {
  return {
    mutationFn: () => deleteUser(auth.currentUser!),
  } satisfies DeleteUserOptions;
};

type UseDeleteUserOptions = UseMutationOptions<void, FirestoreError, void>;

export const useDeleteUser = (options?: Partial<UseDeleteUserOptions>) => {
  return useMutation({
    ...options,
    ...deleteUserOptions(),
  } satisfies UseDeleteUserOptions);
};
