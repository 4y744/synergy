import { createContext, ReactNode, useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

import { AuthStore, createAuthStore } from "../stores/auth-store";

export const AuthContext = createContext<AuthStore>({} as AuthStore);

type AuthProviderProps = Readonly<{
  children?: ReactNode;
}>;

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authStore] = useState(createAuthStore());
  const queryClient = useQueryClient();

  useEffect(() => {
    auth.authStateReady().then(async () => {
      const { initialize, signIn } = authStore.getState();
      const user = auth.currentUser;
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const data = snapshot.data();
        signIn({
          uid: user.uid,
          username: data?.username,
        });
      }
      initialize();
    });
    return authStore.subscribe(
      ({ isSignedIn }) => !isSignedIn && queryClient?.removeQueries()
    );
  }, []);
  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};
