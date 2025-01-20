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
    TODO: IMPLEMENT TRANSLATIONS FOR THESE ERRORS
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
  const data = userDoc.data({ serverTimestamps: "estimate" });
  return {
    uid: credential.user.uid,
    username,
    email,
    created: data?.created.toDate(),
  };
};
export type SignUpOptions = MutationOptions<Partial<Auth>, AuthError, SignUp>;

export const signUpOptions = (authStore: AuthStore) => {
  return {
    mutationFn: async ({ username, email, password }) => {
      const auth = await signUp(username, email, password);
      authStore.getState().signUp(auth);
      return auth;
    },
  } satisfies SignUpOptions;
};
