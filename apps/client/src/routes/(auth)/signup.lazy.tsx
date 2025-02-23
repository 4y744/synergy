import { createLazyFileRoute } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";
import { LanguageToggle } from "~/components/language-toggle";

import { SignUpForm } from "~/features/auth/components/sign-up";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

export const Route = createLazyFileRoute("/(auth)/signup")({
  component: () => {
    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <SignUpForm />
      </ContentLayout>
    );
  },
});
