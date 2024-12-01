import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/libs/firebase";
import { authStore } from "../stores/auth";

export const signOut = async () => {
  await firebaseSignOut(auth);
  authStore.setState({
    uid: undefined,
    username: undefined,
    created: undefined,
    email: undefined,
    signedIn: false,
  });
  return;
};
