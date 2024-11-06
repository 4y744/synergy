import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { useAuthStore } from "../stores";

export const signOut = async () => {
  await firebaseSignOut(auth);
  useAuthStore.setState({
    uid: null,
    email: null,
    signedIn: false,
    ready: true,
  });
  return;
};
