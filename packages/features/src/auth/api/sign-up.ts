import { MutationOptions } from "@tanstack/react-query";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { Auth } from "../types/auth";
import { SignUp } from "../types/sign-up";

const signUp = async (username: string, email: string, password: string) => {
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
    createdAt: serverTimestamp(),
  });
  const userDoc = await getDoc(userDocRef);
  const data = userDoc.data({ serverTimestamps: "estimate" });
  return {
    uid: credential.user.uid,
    username,
    email,
    createdAt: data?.createdAt.toDate(),
  };
};

type SignUpOptions = MutationOptions<Partial<Auth>, AuthError, SignUp>;

export const signUpOptions = () => {
  return {
    mutationFn: ({ username, email, password }) => {
      return signUp(username, email, password);
    },
  } satisfies SignUpOptions;
};
