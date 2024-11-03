import { auth } from "@/libs/firebase";
import { signOut as firebaseSignOut } from "firebase/auth";

export const signOut = () => {
  return new Promise(
    (resolve: (value: void) => void, reject: (error: string) => void) => {
      firebaseSignOut(auth)
        .then(() => resolve())
        .catch(({ code }) => reject(code));
    }
  );
};
