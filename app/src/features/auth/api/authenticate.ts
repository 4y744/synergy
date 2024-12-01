import { authStore } from "../stores/auth";

/**
 * Fetches the current authentication state. Waits if it's still loading.
 */
export const authenticate = async () => {
  let unsubscribe: () => void;
  await new Promise((resolve) => {
    unsubscribe = authStore.subscribe(
      (state) => state,
      (state) => state && resolve(null),
      { fireImmediately: true }
    );
  });
  unsubscribe!();
  //When this line is reached, authState is guaranteed not to be null.
  return authStore.getState()!;
};
