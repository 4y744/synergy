import { MutationOptions } from "@tanstack/react-query";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { Auth } from "../types/auth";
import { SignUpInput } from "../types/sign-up";

const signUp = async (data: SignUpInput) => {
  /*
    TODO: IMPLEMENT TRANSLATIONS FOR THESE ERRORS
    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
  */
  const credential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  const userDocRef = doc(db, "users", credential.user.uid);
  await setDoc(userDocRef, {
    username: data.username,
    createdAt: serverTimestamp(),
  });
  return {
    uid: credential.user.uid,
  };
};

type SignUpOptions = MutationOptions<Partial<Auth>, AuthError, SignUpInput>;

export const signUpOptions = () => {
  return {
    mutationFn: (data) => signUp(data),
  } satisfies SignUpOptions;
};
