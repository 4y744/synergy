import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { SignUpCredentialsSchema } from "../schemas";
import { auth } from "@/libs/firebase";

export const signUp = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  return new Promise(
    (
      resolve: (credential: UserCredential) => void,
      reject: (error: string) => void
    ) => {
      const parsed = SignUpCredentialsSchema.safeParse({
        username,
        email,
        password,
        confirmPassword,
      });
      if (parsed.error) {
        return reject("auth/invalid-input");
      }
      if (parsed.data.password != parsed.data.confirmPassword) {
        return reject("auth/password-mismatch");
      }
      createUserWithEmailAndPassword(
        auth,
        parsed.data.email,
        parsed.data.password
      )
        .then((credential) => resolve(credential))
        .catch((error) => reject(error));
    }
  );
};
