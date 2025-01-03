import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { MutationOptions } from "@tanstack/react-query";
import { Auth } from "../types/auth";
import { SignUp } from "../types/sign-up";
import { AuthStore } from "../stores/auth-store";

import { auth, db } from "@synergy/libs/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  /*
    Firebase Docs - possible error messages.
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
  */
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const userDocRef = doc(db, "users", credential.user.uid);
  await setDoc(userDocRef, {
    username,
    created: serverTimestamp(),
  });
  const userDoc = await getDoc(userDocRef);
  return {
    uid: credential.user.uid,
    username,
    email,
    created: userDoc.data()?.created,
  } as Auth;
};
export type SignUpMutationOptions = MutationOptions<Auth, AuthError, SignUp>;

export const signUpMutationConfig = (authStore: AuthStore) => {
  return {
    mutationKey: ["auth"],
    mutationFn: async ({ username, email, password }) => {
      const auth = await signUp(username, email, password);
      authStore.getState().signUp(auth);
      return auth as Auth;
    },
  } satisfies SignUpMutationOptions;
};
