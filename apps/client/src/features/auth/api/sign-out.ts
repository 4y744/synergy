import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AuthError, signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

import { useAuth } from "../hooks/use-auth";

type SignOutOptions = MutationOptions<void, AuthError, void>;

export const signOutOptions = () => {
  return {
    mutationFn: () => firebaseSignOut(auth),
  } satisfies SignOutOptions;
};

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
