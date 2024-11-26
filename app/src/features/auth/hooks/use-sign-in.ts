import { useState } from "react";
import { signIn } from "../api/sign-in";
import { AuthError, UserCredential } from "firebase/auth";

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signIn: async (
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
        const credential = await signIn(email, password);
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
