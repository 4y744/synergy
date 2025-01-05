import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { MutationOptions } from "@tanstack/react-query";
import { Auth } from "../types/auth";
import { SignIn } from "../types/sign-in";
import { AuthStore } from "../stores/auth-store";

import { auth, db } from "@synergy/libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export const signIn = async (email: string, password: string) => {
  /*
    Firebase Docs - possible error messages.
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
  */
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", credential.user.uid));
  const data = userDoc.data({ serverTimestamps: "estimate" });
  return {
    uid: credential.user.uid,
    username: data?.username,
    email,
    created: data?.created.toDate(),
  };
};

export type SignInMutationOptions = MutationOptions<
  Partial<Auth>,
  AuthError,
  SignIn
>;

export const signInMutationConfig = (authStore: AuthStore) => {
  return {
    mutationKey: ["auth"],
    mutationFn: async ({ email, password }) => {
      const auth = await signIn(email, password);
      authStore.getState().signIn(auth);
      return auth;
    },
  } satisfies SignInMutationOptions;
};
