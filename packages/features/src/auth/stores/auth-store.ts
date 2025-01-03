import { createStore } from "zustand";
import { Auth } from "../types/auth";
import { subscribeWithSelector } from "zustand/middleware";

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
      created: new Date(0),
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
          username: "",
          created: new Date(0),
          email: "",
          isSignedIn: false,
        });
      },
    }))
  );
};

export type AuthStore = ReturnType<typeof createAuthStore>;
