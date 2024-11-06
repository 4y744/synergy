import { create } from "zustand";
import { Auth } from "../types";

/**
 * Main source of truth for authentication.
 */
export const useAuthStore = create<Auth>(() => ({
  uid: null,
  username: null,
  email: null,
  signedIn: false,
  ready: false,
}));
