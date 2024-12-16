import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signUpMutationConfig } from "../api/sign-up";
import { Auth } from "../types/auth";
import { AuthError } from "firebase/auth";
import { SignUp } from "../types/sign-up";
import { useAuth } from "./use-auth";

export type UseSignUpMutationOptions = UseMutationOptions<
  Auth,
  AuthError,
  SignUp
>;

export const useSignUp = (options?: UseSignUpMutationOptions) => {
  const { signUp } = useAuth();
  return useMutation({
    ...signUpMutationConfig(),
    onSuccess: (auth) => signUp({ ...auth, isSignedIn: true }),
    ...options,
  });
};
