import { auth, db } from "@/libs/firebase";
import { ReactNode, useEffect } from "react";
import { useAuthStore } from "../stores";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

type Props = {
  children?: ReactNode;
};

export const AuthLoader = ({ children }: Props) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        useAuthStore.setState({
          uid: user.uid,
          username: snapshot.data()?.username,
          email: user.email,
          signedIn: true,
          ready: true,
        });
      } else {
        useAuthStore.setState({
          ...useAuthStore.getState(),
          ready: true,
        });
      }
      unsubscribe();
    });
  }, []);
  return <>{children}</>;
};
