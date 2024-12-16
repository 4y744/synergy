import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { MutationOptions } from "@tanstack/react-query";

export const signOut = async () => {
  await firebaseSignOut(auth);
};

export const signOutMutationOptions = () => {
  return {
    mutationFn: () => signOut(),
  } satisfies MutationOptions;
};
