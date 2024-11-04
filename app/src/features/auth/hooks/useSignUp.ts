import { useState } from "react";
import { signUp } from "../api/signUp";
import { UserCredential } from "firebase/auth";

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signUp: async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string,
      onsuccess?: (credential?: UserCredential) => void
    ) => {
      setLoading(true);
      try {
        await signUp(username, email, password, confirmPassword);
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
