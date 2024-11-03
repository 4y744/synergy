import { useAuthStore } from "../stores/auth";

export const useAuthActions = () => useAuthStore((store) => store.actions);
