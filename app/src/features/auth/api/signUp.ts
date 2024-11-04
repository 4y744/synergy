import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { SignUpCredentialsSchema } from "../schemas";
import { auth } from "@/libs/firebase";

export const signUp = async (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const parsed = SignUpCredentialsSchema.safeParse({
    username,
    email,
    password,
    confirmPassword,
  });
  if (parsed.error) {
    throw { code: "auth/invalid-input" };
  }
  if (parsed.data.password != parsed.data.confirmPassword) {
    throw { code: "auth/password-mismatch" };
  }
  return createUserWithEmailAndPassword(
    auth,
    parsed.data.email,
    parsed.data.password
  );
};
