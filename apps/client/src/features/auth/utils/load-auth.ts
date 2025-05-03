import { AuthStore } from "../stores/auth-store";

export const loadAuth = async (authStore: AuthStore) => {
  await new Promise<void>((resolve) => {
    const unsubscribe = authStore.subscribe(
      (state) => state.isInitialized,
      (isInitialized) => {
        if (isInitialized) {
          resolve();
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
