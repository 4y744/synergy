import { redirect } from "react-router-dom";

import { CustomLoaderData } from "~/core/router";

import { loadAuth, SignInForm } from "@synergy/features/auth";
import { CustomLoader } from "@synergy/libs/react-router";
import { Page } from "@synergy/ui";

export const loader: CustomLoader<CustomLoaderData> = async ({ authStore }) => {
  await loadAuth(authStore);
  if (authStore.getState().isSignedIn) {
    return redirect("/groups");
  }
};

export default () => {
  return (
    <Page centered>
      <SignInForm />
    </Page>
  );
};
