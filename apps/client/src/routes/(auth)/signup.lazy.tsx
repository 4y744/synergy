import { createLazyFileRoute } from "@tanstack/react-router";

import { H1 } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { SignUpForm } from "~/features/auth/components/sign-up";

export const Route = createLazyFileRoute("/(auth)/signup")({
  component: () => {
    return (
      <ContentLayout isCentered>
        <H1 className="font-arcade">synergy</H1>
        <SignUpForm />
      </ContentLayout>
    );
  },
});
