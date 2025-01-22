import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { Auth } from "../types/auth";
import { SignIn } from "../types/sign-in";

const signIn = async (email: string, password: string) => {
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
    createdAt: data?.createdAt.toDate(),
  };
};

type SignInOptions = MutationOptions<Partial<Auth>, AuthError, SignIn>;

export const signInOptions = () => {
  return {
    mutationFn: ({ email, password }) => {
      return signIn(email, password);
    },
  } satisfies SignInOptions;
};
