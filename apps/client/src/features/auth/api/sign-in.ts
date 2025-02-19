import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

import { Auth } from "../types/auth";
import { SignInInput } from "../types/sign-in";

const signIn = async (data: SignInInput) => {
  /*
    TODO: IMPLEMENT TRANSLATIONS FOR THESE ERRORS
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
  */
  const credential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return {
    uid: credential.user.uid,
  };
};

type SignInOptions = MutationOptions<Partial<Auth>, AuthError, SignInInput>;

export const signInOptions = () => {
  return {
    mutationFn: (data) => signIn(data),
  } satisfies SignInOptions;
};
