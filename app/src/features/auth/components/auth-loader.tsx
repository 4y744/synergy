import { auth, db } from "@/libs/firebase";
import { ReactNode, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { authStore } from "../stores/auth-store";
import { Auth } from "../types/auth";

type Props = {
  children?: ReactNode;
};

export const AuthLoader = ({ children }: Props) => {
  useEffect(() => {
    auth.authStateReady().then(async () => {
      const user = auth.currentUser;
      if (user) {
        const snapshot = await getDoc(doc(db, "users", user.uid));
        const data = snapshot.data();
        authStore.setState({
          uid: user.uid,
          email: user.email!,
          username: data?.username,
          created: new Date(data?.created.seconds),
          signedIn: true,
          initialized: true,
        } satisfies Auth);
      } else {
        authStore.setState({ initialized: true });
      }
    });
  }, []);
  return <>{children}</>;
};
