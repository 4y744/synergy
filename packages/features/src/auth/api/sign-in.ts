import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

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
  const userDoc = await getDoc(doc(db, "users", credential.user.uid));
  const { username, createdAt } = {
    ...userDoc.data({
      serverTimestamps: "estimate",
    }),
  };
  return {
    uid: credential.user.uid,
    username,
    email: credential.user.email!,
    createdAt: createdAt.toDate(),
  };
};

type SignInOptions = MutationOptions<Partial<Auth>, AuthError, SignInInput>;

export const signInOptions = () => {
  return {
    mutationFn: (data) => signIn(data),
  } satisfies SignInOptions;
};
