import { createLazyFileRoute } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { LanguageToggle } from "~/components/language-toggle";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

import { UpgradeGuestForm } from "~/features/auth/components/upgrade-guest";

export const Route = createLazyFileRoute("/(auth)/upgrade")({
  component: () => (
    <ContentLayout isCentered>
      <ThemeToggle />
      <LanguageToggle />
      <Logo />
      <UpgradeGuestForm />
    </ContentLayout>
  ),
});
