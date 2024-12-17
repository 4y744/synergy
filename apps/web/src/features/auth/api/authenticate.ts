import { AuthStore } from "../stores/auth-store";

export const authenticate = async (authStore: AuthStore) => {
  await new Promise((resolve) => {
    const unsubscribe = authStore.subscribe(
      (state) => state.isInitialized,
      (isInitialized) => {
        if (isInitialized) {
          resolve(null);
          unsubscribe();
        }
      },
      { fireImmediately: true }
    );
  });
};
