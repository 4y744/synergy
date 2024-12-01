import { useState } from "react";
import { signUp } from "../api/sigin-up";
import { AuthError, UserCredential } from "firebase/auth";
import { Auth } from "../types/auth";

export const useSignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signUp: async (
      username: string,
      email: string,
      password: string,
      options?: {
        onSuccess?: (authState: Auth) => void;
        onError?: (error: AuthError) => void;
      }
    ) => {
      setLoading(true);
      setError("");
      try {
        const authState = await signUp(username, email, password);
        options?.onSuccess?.(authState);
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
