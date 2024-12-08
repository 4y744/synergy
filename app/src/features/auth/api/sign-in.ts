import { AuthError, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { authStore } from "../stores/auth-store";
import { MutationOptions } from "@tanstack/react-query";
import { Auth } from "../types/auth";
import { SignInCredentials, SignInMutationOptions } from "../types/sign-in";

export const signIn = async (email: string, password: string) => {
  /*
    Firebase Docs - possible error messages.
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#signinwithemailandpassword
  */
  const credential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", credential.user.uid));
  authStore.setState({
    uid: credential.user.uid,
    username: userDoc.data()?.username,
    email,
    created: userDoc.data()?.created,
    signedIn: true,
  });
  return authStore.getState();
};

export const signInMutationConfig = () => {
  return {
    mutationKey: ["auth"],
    mutationFn: ({ email, password }) => {
      return signIn(email, password);
    },
  } satisfies SignInMutationOptions;
};
