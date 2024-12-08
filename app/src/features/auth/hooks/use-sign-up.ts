import { useMutation } from "@tanstack/react-query";
import { signUpMutationConfig } from "../api/sign-up";
import { UseSignUpMutationOptions } from "../types/sign-up";

export const useSignUp = (options?: UseSignUpMutationOptions) => {
  return useMutation({
    ...signUpMutationConfig(),
    ...options,
  });
};
