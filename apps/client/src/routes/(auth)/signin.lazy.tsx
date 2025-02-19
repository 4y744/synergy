import { createLazyFileRoute } from "@tanstack/react-router";

import { H1 } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { SignInForm } from "~/features/auth/components/sign-in";

export const Route = createLazyFileRoute("/(auth)/signin")({
  component: () => {
    return (
      <ContentLayout isCentered>
        <H1 className="font-arcade">synergy</H1>
        <SignInForm />
      </ContentLayout>
    );
  },
});
