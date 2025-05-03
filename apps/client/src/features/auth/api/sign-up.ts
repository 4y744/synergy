import {
  MutationOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import z from "zod";

import { auth, db } from "@synergy/libs/firebase";

import { useAuth } from "../hooks/use-auth";
import { Auth } from "../types/auth";

export const signUpInputSchema = z.object({
  username: z.string().min(4).max(32),
  email: z.string().email(),
  password: z.string().min(6).max(32),
  confirmPassword: z.string(),
});
// Old implmenentation.
// .refine(
//   ({ password, confirmPassword }) =>
//     password == confirmPassword && confirmPassword,
//   {
//     message: t("client.feature.auth.form.errors.password_mismatch"),
//     path: ["confirmPassword"],
//   }
// );

export type SignUpInput = z.infer<typeof signUpInputSchema>;

type SignUpOptions = MutationOptions<Partial<Auth>, AuthError, SignUpInput>;

export const signUpOptions = () => {
  return {
    mutationFn: async (data) => {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", credential.user.uid), {
        username: data.username,
        createdAt: serverTimestamp(),
      });
      return {
        uid: credential.user.uid,
      };
    },
  } satisfies SignUpOptions;
};

type UseSignUpOptions = UseMutationOptions<
  Partial<Auth>,
  AuthError,
  SignUpInput
>;

export const useSignUp = ({ onSuccess, ...rest }: UseSignUpOptions = {}) => {
  const { signIn } = useAuth();
  return useMutation({
    ...rest,
    onSuccess: (auth, ...args) => {
      signIn(auth);
      onSuccess?.(auth, ...args);
    },
    ...signUpOptions(),
  } satisfies UseSignUpOptions);
};
