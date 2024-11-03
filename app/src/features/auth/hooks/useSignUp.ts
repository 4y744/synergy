import { useState } from "react";
import { signUp } from "../api/signUp";
import { UserCredential } from "firebase/auth";

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signUp: (
      username: string,
      email: string,
      password: string,
      confirmPassword: string,
      onsuccess?: (credential?: UserCredential) => void
    ) => {
      setLoading(true);
      signUp(username, email, password, confirmPassword)
        .then((credential) => onsuccess?.(credential))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    loading,
    error,
  };
};
