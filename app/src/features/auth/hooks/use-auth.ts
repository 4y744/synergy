import { useStore } from "zustand";
import { authStore } from "../stores/auth";

export const useAuth = () => useStore(authStore)!;
