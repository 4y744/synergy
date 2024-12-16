import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { MutationOptions } from "@tanstack/react-query";
import { Auth } from "../types/auth";
import { SignIn } from "../types/sign-in";

export const signIn = async (email: string, password: string) => {
  /*
    Firebase Docs - possible error messages.
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
  */
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", credential.user.uid));
  return {
    uid: credential.user.uid,
    username: userDoc.data()?.username,
    email,
    created: userDoc.data()?.created,
  } as Auth;
};

export type SignInMutationOptions = MutationOptions<Auth, AuthError, SignIn>;

export const signInMutationConfig = () => {
  return {
    mutationKey: ["auth"],
    mutationFn: ({ email, password }) => {
      return signIn(email, password);
    },
  } satisfies SignInMutationOptions;
};
