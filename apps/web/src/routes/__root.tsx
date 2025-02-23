import { createRootRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button, H1, P, Separator } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";

export const Route = createRootRoute({
  notFoundComponent: () => {
    const { t } = useTranslation();
    return (
      <ContentLayout isCentered>
        <div className="flex items-center gap-5">
          <H1>404</H1>
          <Separator
            className="h-16"
            orientation="vertical"
          />
          <P>{t("web.404.does_not_exit")}</P>
        </div>
        <Button asChild>
          <Link to="/">{t("web.404.go_to_home")}</Link>
        </Button>
      </ContentLayout>
    );
  },
});
