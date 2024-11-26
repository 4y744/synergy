import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/libs/firebase";

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};
