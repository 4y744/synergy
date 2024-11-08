import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { authStore } from "../stores";

export const signOut = async () => {
  await firebaseSignOut(auth);
  authStore.setState({
    uid: null,
    email: null,
    signedIn: false,
    ready: true,
  });
  return;
};
