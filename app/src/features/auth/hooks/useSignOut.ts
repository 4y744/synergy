import { useState } from "react";
import { signOut } from "../api/signOut";

export const useSignOut = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return {
    signOut: (onsuccess: () => void) => {
      setLoading(true);
      signOut()
        .then(() => onsuccess?.())
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    },
    loading,
    error,
  };
};
