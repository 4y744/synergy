import { createLazyFileRoute } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";
import { LanguageToggle } from "~/components/language-toggle";

import { SignInForm } from "~/features/auth/components/sign-in";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

export const Route = createLazyFileRoute("/(auth)/signin")({
  component: () => {
    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <SignInForm />
      </ContentLayout>
    );
  },
});
