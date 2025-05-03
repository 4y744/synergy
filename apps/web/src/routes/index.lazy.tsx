import { useTranslation } from "react-i18next";
import { createLazyFileRoute } from "@tanstack/react-router";

import { Button, ThemeToggle } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { SiteFooter } from "~/components/layouts/footer";
import { LanguageToggle } from "~/components/language-toggle";

import { CLIENT_URL } from "~/config/env";

export const Route = createLazyFileRoute("/")({
  component: () => {
    const { t } = useTranslation();
    return (
      <>
        <ContentLayout isCentered>
          <ThemeToggle />
          <LanguageToggle />
          <h1 className="text-4xl font-arcade">synergy</h1>
          <div className="flex gap-4">
            <Button
              variant="outline"
              disabled
            >
              {t("web.landing.download")}
            </Button>
            <Button asChild>
              <a href={CLIENT_URL}>{t("web.landing.open_in_browser")}</a>
            </Button>
          </div>
        </ContentLayout>
        <SiteFooter />
      </>
    );
  },
});
