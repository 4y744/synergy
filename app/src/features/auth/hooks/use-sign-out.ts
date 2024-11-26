import { useState } from "react";
import { signOut } from "../api/sign-out";
import { AuthError } from "firebase/auth";

export const useSignOut = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signOut: async (options?: {
      onSuccess?: () => void;
      onError?: (error: AuthError) => void;
    }) => {
      setLoading(true);
      setError("");
      try {
        await signOut();
        options?.onSuccess?.();
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
