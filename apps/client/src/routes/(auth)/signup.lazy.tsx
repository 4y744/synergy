import { useTranslation } from "react-i18next";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { LanguageToggle } from "~/components/language-toggle";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

import { SignUpForm } from "~/features/auth/components/sign-up";

export const Route = createLazyFileRoute("/(auth)/signup")({
  component: () => {
    const { t } = useTranslation();
    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <SignUpForm />
        <div className="flex gap-2">
          <Link
            className="text-sm hover:underline"
            to="/signin"
          >
            {t("client.feature.auth.have_account")}
          </Link>
          <span>/</span>
          <Link
            className="text-sm hover:underline"
            to="/guest"
          >
            {t("client.feature.auth.as_guest")}
          </Link>
        </div>
      </ContentLayout>
    );
  },
});
