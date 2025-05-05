import { useTranslation } from "react-i18next";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { SignUpForm } from "~/features/auth/components/sign-up";

import { LanguageToggle } from "~/components/language-toggle";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

export const Route = createLazyFileRoute("/(auth)/signup")({
  component: () => {
    const search = Route.useSearch();
    const navigate = useNavigate();

    const { t } = useTranslation();
    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <SignUpForm
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
            to="/signin"
            search={search}
          >
            {t("client.feature.auth.have_account")}
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
