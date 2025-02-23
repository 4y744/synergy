import { MutationOptions } from "@tanstack/react-query";
import { AuthError, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { Auth } from "../types/auth";
import { SignUpInput } from "../types/sign-up";

type SignUpOptions = MutationOptions<Partial<Auth>, AuthError, SignUpInput>;

export const signUpOptions = () => {
  return {
    mutationFn: async (data) => {
      const credential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", credential.user.uid), {
        username: data.username,
        createdAt: serverTimestamp(),
      });
      return {
        uid: credential.user.uid,
      };
    },
  } satisfies SignUpOptions;
};
