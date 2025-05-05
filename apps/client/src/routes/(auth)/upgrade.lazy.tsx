import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { UpgradeGuestForm } from "~/features/auth/components/upgrade-guest";

import { LanguageToggle } from "~/components/language-toggle";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

export const Route = createLazyFileRoute("/(auth)/upgrade")({
  component: () => {
    const navigate = useNavigate();

    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <UpgradeGuestForm
          onSuccess={() => {
            navigate({ to: "/groups" });
          }}
        />
      </ContentLayout>
    );
  },
});
