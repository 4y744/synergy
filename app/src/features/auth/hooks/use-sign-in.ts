import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signInMutationConfig } from "../api/sign-in";
import { Auth } from "../types/auth";
import { AuthError } from "firebase/auth";
import { SignIn } from "../types/sign-in";
import { useAuth } from "./use-auth";

export type UseSignInMutationOptions = UseMutationOptions<
  Auth,
  AuthError,
  SignIn
>;

export const useSignIn = (options?: UseSignInMutationOptions) => {
  const { signIn } = useAuth();
  return useMutation({
    ...signInMutationConfig(),
    onSuccess: (auth) => signIn({ ...auth, isSignedIn: true }),
    ...options,
  });
};
