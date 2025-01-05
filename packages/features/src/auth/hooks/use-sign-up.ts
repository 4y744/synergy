import { useContext } from "react";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AuthError } from "firebase/auth";

import { signUpMutationConfig } from "../api/sign-up";
import { AuthContext } from "../components/auth-provider";
import { Auth } from "../types/auth";
import { SignUp } from "../types/sign-up";

export type UseSignUpMutationOptions = UseMutationOptions<
  Partial<Auth>,
  AuthError,
  SignUp
>;

export const useSignUp = (options?: UseSignUpMutationOptions) => {
  const authStore = useContext(AuthContext);
  return useMutation({
    ...options,
    ...signUpMutationConfig(authStore),
  });
};
