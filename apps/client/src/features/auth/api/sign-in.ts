import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

import { Auth } from "../types/auth";
import { SignInInput } from "../types/sign-in";

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
