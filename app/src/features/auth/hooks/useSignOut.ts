import { useState } from "react";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/libs/firebase";

export const useSignOut = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const signOut = (onsuccess?: () => void) => {
    setLoading(true);
    firebaseSignOut(auth)
      .then(() => onsuccess?.())
      .catch(({ code }) => setError(code))
      .finally(() => setLoading(false));
  };

  return { signOut, loading, error };
};
