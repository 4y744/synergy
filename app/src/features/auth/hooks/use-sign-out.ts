import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useAuth } from "./use-auth";
import { signOutMutationOptions } from "../api/sign-out";

export const useSignOut = (options?: UseMutationOptions) => {
  const { signOut } = useAuth();
  return useMutation({
    ...signOutMutationOptions(),
    onSuccess: () => signOut(),
    ...options,
  });
};
