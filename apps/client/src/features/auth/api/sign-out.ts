import { MutationOptions } from "@tanstack/react-query";
import { AuthError, signOut as firebaseSignOut } from "firebase/auth";

import { auth } from "@synergy/libs/firebase";

type SignOutOptions = MutationOptions<void, AuthError, void>;

export const signOutOptions = () => {
  return {
    mutationFn: () => firebaseSignOut(auth),
  } satisfies SignOutOptions;
};
