import { useState } from "react";
import { signUp } from "../api/sigin-up";
import { AuthError, UserCredential } from "firebase/auth";

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signUp: async (
      username: string,
      email: string,
      password: string,
      options?: {
        onSuccess?: (credential: UserCredential) => void;
        onError?: (error: AuthError) => void;
      }
    ) => {
      setLoading(true);
      setError("");
      try {
        const credential = await signUp(email, password);
        options?.onSuccess?.(credential);
      } catch (err: any) {
        options?.onError?.(err as AuthError);
        setLoading(false);
        setError(err.code as string);
      }
    },
    loading,
    error,
  };
};
