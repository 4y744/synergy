import { createLazyFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@synergy/features/auth";
import { Page } from "@synergy/ui";

export const Route = createLazyFileRoute("/signup")({
  component: () => {
    return (
      <Page centered>
        <SignUpForm />
      </Page>
    );
  },
});
