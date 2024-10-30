import { useState } from "react";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { SignInCredentialsSchema } from "../types";

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signIn = (
    email?: string,
    password?: string,
    onsuccess?: (credential?: UserCredential) => void
  ) => {
    const parsed = SignInCredentialsSchema.safeParse({ email, password });
    if (parsed.error) {
      return setError("auth/invalid-input");
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password)
      .then((credential) => onsuccess?.(credential))
      .catch(({ code }) => setError(code))
      .finally(() => setLoading(false));
  };

  return { signIn, loading, error };
};
