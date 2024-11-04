import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInCredentialsSchema } from "../schemas";
import { auth } from "@/libs/firebase";

export const signIn = async (email: string, password: string) => {
  const parsed = SignInCredentialsSchema.safeParse({ email, password });
  if (parsed.error) {
    throw { code: "auth/invalid-input" };
  }
  return await signInWithEmailAndPassword(
    auth,
    parsed.data.email,
    parsed.data.password
  );
};
