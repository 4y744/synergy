import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { useTranslation } from "react-i18next";
import { Button } from "@synergy/ui";

import { ProtectedRoute } from "~/features/auth/components/protected-route";
import { useCreateMember } from "~/features/members/hooks/use-create-member";
import { ContentLayout } from "~/components/layouts/content-layout";

export const Route = createLazyFileRoute("/(app)/invite/$inviteId")({
  component: () => {
    const { inviteId } = Route.useParams();
    const navigate = useNavigate();

    const { t } = useTranslation();

    const { mutateAsync: createMember, isPending } = useCreateMember({
      onSuccess: () => navigate({ to: "/groups" }),
    });

    return (
      <ProtectedRoute>
        <ContentLayout isCentered>
          <Button
            className="w-48"
            onClick={() => createMember({ inviteId })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                {t("client.action.proceeding")}
              </>
            ) : (
              t("client.action.proceed")
            )}
          </Button>
          <Button
            className="w-48"
            variant="destructive"
            asChild
          >
            <Link to="/">{t("client.action.cancel")}</Link>
          </Button>
        </ContentLayout>
      </ProtectedRoute>
    );
  },
});
