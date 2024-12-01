import { useState } from "react";
import { signIn } from "../api/sign-in";
import { AuthError } from "firebase/auth";
import { Auth } from "../types/auth";

export const useSignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signIn: async (
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
        const authState = await signIn(email, password);
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
