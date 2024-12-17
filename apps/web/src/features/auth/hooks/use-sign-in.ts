import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signInMutationConfig } from "../api/sign-in";
import { Auth } from "../types/auth";
import { AuthError } from "firebase/auth";
import { SignIn } from "../types/sign-in";
import { useContext } from "react";
import { AuthContext } from "../components/auth-provider";

export type UseSignInMutationOptions = UseMutationOptions<
  Auth,
  AuthError,
  SignIn
>;

export const useSignIn = (options?: UseSignInMutationOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...signInMutationConfig(authStore),
    ...options,
  });
};
