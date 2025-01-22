import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

const signOut = () => {
  return firebaseSignOut(auth);
};

type SignOutOptions = MutationOptions<void, AuthError, void>;

export const signOutOptions = () => {
  return {
    mutationFn: () => {
      return signOut();
    },
  } satisfies SignOutOptions;
};
