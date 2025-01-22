import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signOutOptions } from "../api/sign-out";
import { useAuth } from "./use-auth";

type UseSignOutOptions = UseMutationOptions<void, AuthError, void>;

export const useSignOut = ({ onSuccess, ...rest }: UseSignOutOptions = {}) => {
  const { signOut } = useAuth();
  return useMutation({
    ...rest,
    onSuccess: (...args) => {
      signOut();
      onSuccess?.(...args);
    },
    ...signOutOptions(),
  } satisfies UseSignOutOptions);
};
