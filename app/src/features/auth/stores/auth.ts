import { createStore } from "zustand";
import { Auth } from "../types/auth";
import { subscribeWithSelector } from "zustand/middleware";

/**
 * Main source of truth for authentication.
 */
export const authStore = createStore<Auth>()(
  subscribeWithSelector((set) => null)
);
