import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { SignInCredentialsSchema } from "../schemas";
import { auth } from "@/libs/firebase";

export const signIn = (email: string, password: string) => {
  return new Promise(
    (
      resolve: (credential: UserCredential) => void,
      reject: (error: string) => void
    ) => {
      const parsed = SignInCredentialsSchema.safeParse({ email, password });
      if (parsed.error) {
        return reject("auth/invalid-input");
      }
      signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password)
        .then((credential) => resolve(credential))
        .catch(({ code }) => reject(code));
    }
  );
};
