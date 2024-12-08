import { authStore } from "../stores/auth-store";

/**
 * Fetches the current authentication state. Waits if it's still not initialized.
 */
export const authenticate = async () => {
  await new Promise((resolve) => {
    const unsubscribe = authStore.subscribe(
      (state) => state.initialized,
      (initialized) => {
        if (initialized) {
          resolve(null);
          unsubscribe();
        }
      },
      { fireImmediately: true }
    );
  });
  return authStore.getState();
};
