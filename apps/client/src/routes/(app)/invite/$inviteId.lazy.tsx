import { useTranslation } from "@synergy/i18n";
import { Button, H1, Separator } from "@synergy/ui";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { ContentLayout } from "~/components/layouts/content-layout";
import { ProtectedRoute } from "~/features/auth/components/protected-route";
import { useCreateMember } from "~/features/members/hooks/use-create-member";

export const Route = createLazyFileRoute("/(app)/invite/$inviteId")({
  component: () => {
    const { inviteId } = Route.useParams();
    const navigate = useNavigate();
    const { mutateAsync: createMember, isPending } = useCreateMember({
      onSuccess: () => navigate({ to: "/groups" }),
    });

    const { t } = useTranslation();

    return (
      <ProtectedRoute>
        <ContentLayout isCentered>
          <div className="space-y-4">
            <H1 className="font-arcade">synergy</H1>
            <Separator />
            <Button
              className="w-full"
              variant="secondary"
              onClick={() => createMember({ inviteId })}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  {t("generic.proceeding")}
                </>
              ) : (
                t("generic.proceed")
              )}
            </Button>
            <Button
              className="w-full"
              variant="destructive"
              asChild
            >
              <Link to="/">{t("generic.cancel")}</Link>
            </Button>
          </div>
        </ContentLayout>
      </ProtectedRoute>
    );
  },
});
