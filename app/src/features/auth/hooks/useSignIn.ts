import { useState } from "react";
import { signIn } from "../api/signIn";
import { UserCredential } from "firebase/auth";

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signIn: (
      email: string,
      password: string,
      onsuccess?: (credential?: UserCredential) => void
    ) => {
      setLoading(true);
      signIn(email, password)
        .then((credential) => onsuccess?.(credential))
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    loading,
    error,
  };
};
