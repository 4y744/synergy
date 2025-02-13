import { createStore } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { Auth } from "../types/auth";

export type AuthState = Auth & {
  signIn: (auth: Partial<Auth>) => void;
  signUp: (auth: Partial<Auth>) => void;
  signOut: () => void;
  initialize: () => void;
};

export const createAuthStore = () => {
  return createStore<AuthState>()(
    subscribeWithSelector((set) => ({
      uid: "",
      isSignedIn: false,
      isInitialized: false,
      initialize: () => set({ isInitialized: true }),
      signIn: (data) => set({ ...data, isSignedIn: true }),
      signUp: (data) => set({ ...data, isSignedIn: true }),
      signOut: () => set({ isSignedIn: false }),
    }))
  );
};

export type AuthStore = ReturnType<typeof createAuthStore>;
