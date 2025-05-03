import { useTranslation } from "react-i18next";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { LanguageToggle } from "~/components/language-toggle";
import { Logo } from "~/components/logo";

import { SignInForm } from "~/features/auth/components/sign-in";

export const Route = createLazyFileRoute("/(auth)/signin")({
  component: () => {
    const { t } = useTranslation();
    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <SignInForm />
        <div className="flex gap-2">
          <Link
            className="text-sm hover:underline"
            to="/signup"
          >
            {t("client.feature.auth.with_email")}
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
