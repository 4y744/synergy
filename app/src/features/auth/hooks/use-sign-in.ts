import { useMutation } from "@tanstack/react-query";
import { signInMutationConfig } from "../api/sign-in";
import { UseSignInMutationOptions } from "../types/sign-in";

export const useSignIn = (options?: UseSignInMutationOptions) => {
  return useMutation({
    ...signInMutationConfig(),
    ...options,
  });
};
