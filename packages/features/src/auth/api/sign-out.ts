import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

import { AuthStore } from "../stores/auth-store";

export const signOut = () => {
  return firebaseSignOut(auth);
};

export type SignOutOptions = MutationOptions<void, AuthError, void>;

export const signOutOptions = (authStore: AuthStore) => {
  return {
    mutationFn: async () => {
      await signOut();
      authStore.getState().signOut();
    },
  } satisfies SignOutOptions;
};
