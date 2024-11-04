import { auth } from "@/libs/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

export const signOut = async () => {
  return firebaseSignOut(auth);
};
