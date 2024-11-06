import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { useAuthStore } from "../stores";
import { Auth } from "../types";
import { onStoreStateChanged } from "@/libs/zustand";

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
      onStoreStateChanged(useAuthStore, (state) => {
        state.ready && resolve(null);
        return state.ready;
      });
    });
    const auth = useAuthStore.getState();
    if (!auth.signedIn) {
      throw redirect("/signin");
    }
    return await (loader?.(auth, args) || null);
  };
};
