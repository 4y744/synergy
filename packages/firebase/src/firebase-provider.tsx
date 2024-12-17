import { createContext, ReactNode, useState } from "react";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase-config";

export const FirebaseContext = createContext<FirebaseApp>({} as FirebaseApp);

type Props = Readonly<{
  children?: ReactNode;
}>;

export const FirebaseProvider = ({ children }: Props) => {
  const [app] = useState(initializeApp(firebaseConfig));
  return (
    <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>
  );
};
