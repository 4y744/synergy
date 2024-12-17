import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { MutationOptions } from "@tanstack/react-query";
import { AuthStore } from "../stores/auth-store";

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
