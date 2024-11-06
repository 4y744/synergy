import { signInWithEmailAndPassword } from "firebase/auth";
import { SignInCredentialsSchema } from "../schemas";
import { auth, db } from "@/libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthStore } from "../stores";

export const signIn = async (email: string, password: string) => {
  const parsed = SignInCredentialsSchema.safeParse({ email, password });
  if (parsed.error) {
    throw { code: "auth/invalid-input" };
  }
  const credential = await signInWithEmailAndPassword(
    auth,
    parsed.data.email,
    parsed.data.password
  );
  const snapshot = await getDoc(doc(db, "users", credential.user.uid));
  useAuthStore.setState({
    uid: credential.user.uid,
    username: snapshot.data()?.username,
    email,
    signedIn: true,
    ready: true,
  });
  return;
};
