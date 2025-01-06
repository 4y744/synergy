import { useContext } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signOutOptions } from "../api/sign-out";
import { AuthContext } from "../components/auth-provider";

export type UseSignOutOptions = UseMutationOptions<void, AuthError, void>;

export const useSignOut = (options?: UseSignOutOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...options,
    ...signOutOptions(authStore),
  });
};
