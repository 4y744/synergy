import { createLazyFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@synergy/features/auth";
import { Page } from "@synergy/ui";

export const Route = createLazyFileRoute("/signin")({
  component: () => {
    return (
      <Page centered>
        <SignInForm />
      </Page>
    );
  },
});
