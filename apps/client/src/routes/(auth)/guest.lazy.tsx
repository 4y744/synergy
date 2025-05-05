import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";

import { ThemeToggle } from "@synergy/ui";

import { LanguageToggle } from "~/components/language-toggle";
import { ContentLayout } from "~/components/layouts/content-layout";
import { Logo } from "~/components/logo";

import { CreateGuestForm } from "~/features/auth/components/create-guest";

export const Route = createLazyFileRoute("/(auth)/guest")({
  component: () => {
    const search = Route.useSearch();
    const navigate = useNavigate();

    return (
      <ContentLayout isCentered>
        <ThemeToggle />
        <LanguageToggle />
        <Logo />
        <CreateGuestForm
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
      </ContentLayout>
    );
  },
});
