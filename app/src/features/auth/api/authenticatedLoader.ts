import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { onStoreStateChanged } from "@/libs/zustand";
import { useAuthStore } from "../stores";
import { Auth } from "../types";

/**
 * Loader that tries to authenticate before rendering the route.
 * Throws if the user is not signed in and redirects to _/signin_.
 * @param loader optional loader to run after authenticating.
 * @returns
 */
export const authenticatedLoader = (
  loader?: (auth?: Auth, args?: LoaderFunctionArgs) => any | Promise<any>
) => {
  return async (args: LoaderFunctionArgs) => {
    await new Promise((resolve) => {
      onStoreStateChanged(useAuthStore, (state, prevState, unsubscribe) => {
        if (state.ready) {
          unsubscribe();
          resolve(null);
        }
      });
    });
    const auth = useAuthStore.getState();
    if (!auth.signedIn) {
      throw redirect("/signin");
    }
    return loader?.(auth, args) || null;
  };
};
