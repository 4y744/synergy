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
      username: "",
      createdAt: new Date(0),
      email: "",
      isSignedIn: false,
      isInitialized: false,
      initialize: () => {
        set({ isInitialized: true });
      },
      signIn: (auth) => {
        set({ ...auth, isSignedIn: true });
      },
      signUp: (auth) => {
        set({ ...auth, isSignedIn: true });
      },
      signOut: () => {
        set({
          uid: "",
          email: "",
          isSignedIn: false,
        });
      },
    }))
  );
};

export type AuthStore = ReturnType<typeof createAuthStore>;
