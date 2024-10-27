import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/libs/firebase";

type Props = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch({
        type: "auth/change",
        payload: {
          uid: user?.uid,
          email: user?.email,
          signedIn: user ? true : false,
        },
      });
    });
  }, []);

  return <>{children}</>;
};
