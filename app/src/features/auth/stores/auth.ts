import { create } from "zustand";
import { Auth } from "../types";

type AuthStore = {
  state: Auth;
  actions: {
    change: (action: Auth) => void;
  };
};

export const useAuthStore = create<AuthStore>((set) => ({
  state: {
    uid: null,
    email: null,
    signedIn: false,
    loading: true,
  },
  actions: {
    change: (action: Auth) => {
      set((store) => ({
        actions: store.actions,
        state: action,
      }));
    },
  },
}));
