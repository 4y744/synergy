import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { signUpMutationConfig } from "../api/sign-up";
import { Auth } from "../types/auth";
import { AuthError } from "firebase/auth";
import { SignUp } from "../types/sign-up";
import { AuthContext } from "../components/auth-provider";
import { useContext } from "react";

export type UseSignUpMutationOptions = UseMutationOptions<
  Auth,
  AuthError,
  SignUp
>;

export const useSignUp = (options?: UseSignUpMutationOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...signUpMutationConfig(authStore),
    ...options,
  });
};
