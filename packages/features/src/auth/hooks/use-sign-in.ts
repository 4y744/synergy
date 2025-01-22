import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signInOptions } from "../api/sign-in";
import { useAuth } from "./use-auth";
import { Auth } from "../types/auth";
import { SignIn } from "../types/sign-in";

type UseSignInOptions = UseMutationOptions<Partial<Auth>, AuthError, SignIn>;

export const useSignIn = ({ onSuccess, ...rest }: UseSignInOptions = {}) => {
  const { signIn } = useAuth();
  return useMutation({
    ...rest,
    onSuccess: (auth, ...rest) => {
      signIn(auth);
      onSuccess?.(auth, ...rest);
    },
    ...signInOptions(),
  } satisfies UseSignInOptions);
};
