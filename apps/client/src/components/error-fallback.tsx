import { TriangleAlertIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button, Separator } from "@synergy/ui";

import { ContentLayout } from "./layouts/content-layout";

export const ErrorFallback = () => {
  const { t } = useTranslation();
  return (
    <ContentLayout isCentered>
      <div className="space-y-4">
        <div className="flex justify-center gap-2 font-medium text-destructive">
          <TriangleAlertIcon />
          {t("client.errors.generic")}
        </div>
        <Separator />
        <Button
          className="w-full"
          onClick={() => window.location.reload()}
        >
          {t("client.action.retry")}
        </Button>
      </div>
    </ContentLayout>
  );
};
ErrorFallback.displayName = "ErrorFallback";
