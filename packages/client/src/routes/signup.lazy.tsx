import { createLazyFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@synergy/features/auth";

import { ContentLayout } from "~/components/layouts/content-layout";

export const Route = createLazyFileRoute("/signup")({
  component: () => {
    const navigate = Route.useNavigate();
    return (
      <ContentLayout isCentered>
        <SignUpForm
          onSuccess={() => navigate({ to: "/groups" })}
          onSwitch={() => navigate({ to: "/signin" })}
        />
      </ContentLayout>
    );
  },
});
