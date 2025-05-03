import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import z from "zod";

import { auth } from "@synergy/libs/firebase";

import { useAuth } from "../hooks/use-auth";
import { Auth } from "../types/auth";

export const signInInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SignInInput = z.infer<typeof signInInputSchema>;

type SignInOptions = MutationOptions<Partial<Auth>, AuthError, SignInInput>;

export const signInOptions = () => {
  return {
    mutationFn: async (data) => {
      const credential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      return {
        uid: credential.user.uid,
      };
    },
  } satisfies SignInOptions;
};

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
