import { useContext } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signInOptions } from "../api/sign-in";
import { AuthContext } from "../components/auth-provider";
import { Auth } from "../types/auth";
import { SignIn } from "../types/sign-in";

export type UseSignInOptions = UseMutationOptions<
  Partial<Auth>,
  AuthError,
  SignIn
>;

export const useSignIn = (options?: UseSignInOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...options,
    ...signInOptions(authStore),
  } satisfies UseSignInOptions);
};
