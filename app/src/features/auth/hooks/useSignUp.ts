import { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "@/libs/firebase";

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signUp = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    onsuccess?: (credential?: UserCredential) => void
  ) => {
    if (password != confirmPassword) {
      return setError("auth/password-mismatch");
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => onsuccess?.(credential))
      .catch(({ code }) => setError(code))
      .finally(() => setLoading(false));
  };

  return { signUp, loading, error };
};
