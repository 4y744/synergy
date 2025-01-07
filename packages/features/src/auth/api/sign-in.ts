import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { AuthStore } from "../stores/auth-store";
import { Auth } from "../types/auth";
import { SignIn } from "../types/sign-in";

export const signIn = async (email: string, password: string) => {
  /*
    TODO: IMPLEMENT TRANSLATIONS FOR THESE ERRORS
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

export type SignInOptions = MutationOptions<Partial<Auth>, AuthError, SignIn>;

export const signInConfig = (authStore: AuthStore) => {
  return {
    mutationFn: async ({ email, password }) => {
      const auth = await signIn(email, password);
      authStore.getState().signIn(auth);
      return auth;
    },
  } satisfies SignInOptions;
};
