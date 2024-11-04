import { useState } from "react";
import { signOut } from "../api/signOut";

export const useSignOut = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signOut: async (onsuccess?: () => void) => {
      setLoading(true);
      try {
        await signOut();
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
