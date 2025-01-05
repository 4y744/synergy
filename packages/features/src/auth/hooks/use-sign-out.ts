import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signOutMutationOptions } from "../api/sign-out";
import { AuthContext } from "../components/auth-provider";
import { useContext } from "react";
import { AuthError } from "firebase/auth";

export type UseSignOutMutationOptions = UseMutationOptions<
  void,
  AuthError,
  void
>;

export const useSignOut = (options?: UseSignOutMutationOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...options,
    ...signOutMutationOptions(authStore),
  });
};
