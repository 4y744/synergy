import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signInOptions } from "../api/sign-in";
import { useAuth } from "./use-auth";
import { Auth } from "../types/auth";
import { SignInInput } from "../types/sign-in";

type UseSignInOptions = UseMutationOptions<
  Partial<Auth>,
  AuthError,
  SignInInput
>;

export const useSignIn = ({ onSuccess, ...rest }: UseSignInOptions = {}) => {
  const { signIn } = useAuth();
  return useMutation({
    ...rest,
    onSuccess: (auth, ...args) => {
      signIn(auth);
      onSuccess?.(auth, ...args);
    },
    ...signInOptions(),
  } satisfies UseSignInOptions);
};
