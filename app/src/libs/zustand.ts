import { StoreApi, UseBoundStore } from "zustand";

/**
 * Observes a Zustand store. The ```listener``` runs once when attached and whenever the store updates.
 * @param store the store you want to subscribe to.
 * @param listener the listener you want to pass, returns boolean which decides wheter to unsubscribe.
 * @returns function to unsubscribe from the store.
 */
export const onStoreStateChanged = <State>(
  store: UseBoundStore<StoreApi<State>>,
  listener: (state: State, prevState: State, unsubscribe: () => void) => void
) => {
  const unsubscribe = store.subscribe((...args) => {
    listener(...args, unsubscribe);
  });
  listener(store.getState(), store.getState(), unsubscribe);
  return unsubscribe;
};
