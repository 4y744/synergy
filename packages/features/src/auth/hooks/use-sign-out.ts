import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signOutMutationOptions } from "../api/sign-out";
import { AuthContext } from "../components/auth-provider";
import { useContext } from "react";

export type UseSignOutMutationOptions = UseMutationOptions;

export const useSignOut = (options?: UseSignOutMutationOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...signOutMutationOptions(authStore),
    ...options,
  });
};
