import { useState } from "react";
import { signIn } from "../api/signIn";
import { UserCredential } from "firebase/auth";
import { useAuth } from "./useAuth";

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signIn: async (
      email: string,
      password: string,
      onsuccess?: (credential?: UserCredential) => void
    ) => {
      setLoading(true);
      try {
        await signIn(email, password);
        onsuccess?.();
      } catch (err: any) {
        setError(err.code);
      } finally {
        setLoading(false);
      }
    },
    loading,
    error,
  };
};
