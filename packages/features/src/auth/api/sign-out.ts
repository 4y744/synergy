import { MutationOptions } from "@tanstack/react-query";
import { AuthStore } from "../stores/auth-store";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@synergy/libs/firebase";

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const signOutMutationOptions = (authStore: AuthStore) => {
  return {
    mutationFn: async () => {
      await signOut();
      authStore.getState().signOut();
    },
  } satisfies MutationOptions;
};
