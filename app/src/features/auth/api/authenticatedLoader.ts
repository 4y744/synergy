import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { useAuthStore } from "../stores";
import { Auth } from "../types";

export const authenticatedLoader = (
  loader: (auth?: Auth, args?: LoaderFunctionArgs) => Promise<any>
) => {
  return async (args: LoaderFunctionArgs) => {
    const auth = await new Promise((resolve: (auth: Auth) => void) => {
      const { state } = useAuthStore.getState();
      if (state.loading) {
        const unsubscribe = useAuthStore.subscribe((store) => {
          unsubscribe();
          resolve(store.state);
        });
      } else {
        resolve(state);
      }
    });
    if (!auth.signedIn) {
      throw redirect("/signin");
    }
    return await loader(auth, args);
  };
};
