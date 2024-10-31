import { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth, db } from "@/libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import { SignUpCredentialsSchema } from "../types";

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
    const parsed = SignUpCredentialsSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    });
    if (parsed.error) {
      return setError("auth/invalid-input");
    }
    if (parsed.data.password != parsed.data.confirmPassword) {
      return setError("auth/password-mismatch");
    }
    setLoading(true);
    createUserWithEmailAndPassword(
      auth,
      parsed.data.email,
      parsed.data.password
    )
      .then((credential) => {
        onsuccess?.(credential);
        const docRef = doc(db, "users", credential.user.uid);
        setDoc(docRef, { username: parsed.data.username }).catch(({ code }) =>
          setError(code)
        );
      })
      .catch(({ code }) => setError(code))
      .finally(() => setLoading(false));
  };

  return { signUp, loading, error };
};
