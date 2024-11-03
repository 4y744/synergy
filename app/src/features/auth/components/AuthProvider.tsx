import { ReactNode, useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { useAuthActions } from "../hooks/useAuthActions";
import { auth } from "@/libs/firebase";

type Props = {
  children?: ReactNode;
};

/**
 * Keeps the auth store up to date.
 */
export const AuthProvider = ({ children }: Props) => {
  const { change } = useAuthActions();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      change({
        uid: user?.uid || null,
        email: user?.email || null,
        signedIn: user ? true : false,
        loading: false,
      });
    });
  }, []);

  return <>{children}</>;
};
