import { createStore } from "zustand";
import { Auth } from "../types";
import { subscribeWithSelector } from "zustand/middleware";

/**
 * Main source of truth for authentication.
 */
export const authStore = createStore<Auth>()(
  subscribeWithSelector((set) => ({
    uid: null,
    username: null,
    email: null,
    signedIn: false,
    ready: false,
  }))
);
