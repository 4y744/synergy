import { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, setDoc } from "firebase/firestore";

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
      .then((credential) => {
        onsuccess?.(credential);
        const docRef = doc(db, "users", credential.user.uid);
        setDoc(docRef, { username }).catch(({ code }) => setError(code));
      })
      .catch(({ code }) => setError(code))
      .finally(() => setLoading(false));
  };

  return { signUp, loading, error };
};
