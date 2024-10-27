import { RootState } from "@/core/store";
import { useSelector } from "react-redux";

export const useAuth = () => useSelector((state: RootState) => state.auth);
