import { createUserWithEmailAndPassword } from "firebase/auth";
import { SignUpCredentialsSchema } from "../schemas";
import { auth, db } from "@/libs/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuthStore } from "../stores";

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
  const credential = await createUserWithEmailAndPassword(
    auth,
    parsed.data.email,
    parsed.data.password
  );
  await setDoc(doc(db, "users", credential.user.uid), {
    username,
    created: serverTimestamp(),
  });
  useAuthStore.setState({
    uid: credential.user.uid,
    username,
    email,
    signedIn: true,
    ready: true,
  });
  return;
};
