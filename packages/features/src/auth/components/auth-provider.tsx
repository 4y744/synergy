import { createContext, ReactNode, useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";

import { AuthStore, createAuthStore } from "../stores/auth-store";
import { auth, db } from "@synergy/libs/firebase";

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
          email: user.email!,
          ...data,
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
