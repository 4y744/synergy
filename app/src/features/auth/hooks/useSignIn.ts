import { useState } from "react";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/libs/firebase";

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signIn = (
    email: string,
    password: string,
    onsuccess?: (credential?: UserCredential) => void
  ) => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => onsuccess?.(credential))
      .catch(({ code }) => setError(code))
      .finally(() => setLoading(false));
  };

  return { signIn, loading, error };
};
