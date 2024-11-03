import { useAuthStore } from "../stores/auth";

export const useAuth = () => useAuthStore((store) => store.state);
