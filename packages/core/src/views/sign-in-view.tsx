import { loadAuth, SignInForm } from "@synergy/features/auth";
import { Page } from "@synergy/ui";
import { redirect } from "@tanstack/react-router";
import { Loader } from "~/types/router";

const signInLoader: Loader = async ({ context }) => {
  const { authStore } = context;
  await loadAuth(authStore);
  if (authStore.getState().isSignedIn) {
    throw redirect({ to: "/groups" });
  }
};

const SignInView = () => {
  return (
    <Page centered>
      <SignInForm />
    </Page>
  );
};

export const signInRouteOptions = {
  beforeLoader: signInLoader,
  component: SignInView,
};
