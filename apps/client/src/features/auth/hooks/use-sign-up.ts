import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signUpOptions } from "../api/sign-up";
import { useAuth } from "./use-auth";
import { Auth } from "../types/auth";
import { SignUpInput } from "../types/sign-up";

type UseSignUpOptions = UseMutationOptions<
  Partial<Auth>,
  AuthError,
  SignUpInput
>;

export const useSignUp = ({ onSuccess, ...rest }: UseSignUpOptions = {}) => {
  const { signUp } = useAuth();
  return useMutation({
    ...rest,
    onSuccess: (auth, ...args) => {
      signUp(auth);
      onSuccess?.(auth, ...args);
    },
    ...signUpOptions(),
  } satisfies UseSignUpOptions);
};
