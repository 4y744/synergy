import { loadAuth, SignUpForm } from "@synergy/features/auth";
import { Page } from "@synergy/ui";
import { redirect } from "@tanstack/react-router";
import { Loader } from "~/types/router";

const signUpLoader: Loader = async ({ context }) => {
  const { authStore } = context;
  await loadAuth(authStore);
  if (authStore.getState().isSignedIn) {
    throw redirect({ to: "/groups" });
  }
};

const SignUpView = () => {
  return (
    <Page centered>
      <SignUpForm />
    </Page>
  );
};

export const signUpRouteOptions = {
  beforeLoader: signUpLoader,
  component: SignUpView,
};
