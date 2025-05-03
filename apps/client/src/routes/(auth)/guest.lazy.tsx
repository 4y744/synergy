import { createLazyFileRoute } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { LanguageToggle } from "~/components/language-toggle";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

import { CreateGuestForm } from "~/features/auth/components/create-guest";

export const Route = createLazyFileRoute("/(auth)/guest")({
  component: () => {
    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <CreateGuestForm />
      </ContentLayout>
    );
  },
});
