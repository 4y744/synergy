import { useTranslation } from "react-i18next";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { SignInForm } from "~/features/auth/components/sign-in";

import { ContentLayout } from "~/components/layouts/content-layout";
import { LanguageToggle } from "~/components/language-toggle";
import { Logo } from "~/components/logo";

export const Route = createLazyFileRoute("/(auth)/signin")({
  component: () => {
    const search = Route.useSearch();
    const navigate = useNavigate();

    const { t } = useTranslation();

    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <SignInForm
          onSuccess={() => {
            if (search.invite) {
              navigate({
                to: "/invite/$inviteId",
                params: { inviteId: search.invite },
              });
            } else {
              navigate({ to: "/groups" });
            }
          }}
        />
        <div className="flex gap-2">
          <Link
            className="text-sm hover:underline"
            to="/signup"
            search={search}
          >
            {t("client.feature.auth.with_email")}
          </Link>
          <span>/</span>
          <Link
            className="text-sm hover:underline"
            to="/guest"
            search={search}
          >
            {t("client.feature.auth.as_guest")}
          </Link>
        </div>
      </ContentLayout>
    );
  },
});
