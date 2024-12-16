import { useContext } from "react";
import { AuthContext } from "../components/auth-provider";
import { useStore } from "zustand";

export const useAuth = () => {
  const authStore = useContext(AuthContext);
  if (!authStore) {
    throw new Error("Can't find AuthProvider.");
  }
  return useStore(authStore);
};
