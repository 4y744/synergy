import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { authStore } from "../stores/auth";
import { Auth } from "../types/auth";

/**
 * Loader that tries to authenticate before rendering the route.
 * Throws if the user is not signed in and redirects to _/signin_.
 * @param loader optional loader to run after authenticating.
 * @returns
 */
export const authenticatedLoader = (
  loader?: (auth: Auth, args: LoaderFunctionArgs) => any | Promise<any>
) => {
  return async (args: LoaderFunctionArgs) => {
    let unsubscribe: () => void;
    await new Promise((resolve) => {
      unsubscribe = authStore.subscribe(
        (state) => state.ready,
        (ready) => ready && resolve(null),
        { fireImmediately: true }
      );
    });
    unsubscribe!();
    const auth = authStore.getState();
    if (!auth.signedIn) {
      throw redirect("/signin");
    }
    return loader?.(auth, args) || null;
  };
};
