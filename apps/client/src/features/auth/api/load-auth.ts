import { AuthStore } from "../stores/auth-store";

export const loadAuth = async (authStore: AuthStore) => {
  await new Promise((resolve) => {
    const unsubscribe = authStore.subscribe(
      (state) => state.isInitialized,
      (isInitialized) => {
        if (isInitialized) {
          resolve(null);
          unsubscribe();
        }
      },
      {
        fireImmediately: true,
      }
    );
  });
  return authStore.getState();
};
