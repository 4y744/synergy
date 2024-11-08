import { auth, db } from "@/libs/firebase";
import { ReactNode, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { authStore } from "../stores";

type Props = {
  children?: ReactNode;
};

export const AuthLoader = ({ children }: Props) => {
  useEffect(() => {
    auth.authStateReady().then(async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        authStore.setState({
          uid: user.uid,
          username: snapshot.data()?.username,
          email: user.email,
          signedIn: true,
          ready: true,
        });
      } else {
        authStore.setState({
          ...authStore.getState(),
          ready: true,
        });
      }
    });
  }, []);
  return <>{children}</>;
};
