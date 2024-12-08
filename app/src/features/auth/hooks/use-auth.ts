import { useStore } from "zustand";
import { authStore } from "../stores/auth-store";

export const useAuth = () => useStore(authStore)!;
