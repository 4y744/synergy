import { createContext, ReactNode, useState } from "react";

export const AuthContext = createContext({});

type Props = {
  children?: ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState();

  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
};
