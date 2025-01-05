import { useContext } from "react";
import { useStore } from "zustand";

import { AuthContext } from "../components/auth-provider";

export const useAuth = () => {
  const authStore = useContext(AuthContext);
  return useStore(authStore);
};
