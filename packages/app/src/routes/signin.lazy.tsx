import { createLazyFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@synergy/features/auth";

import { ContentLayout } from "~/components/layouts/content-layout";

export const Route = createLazyFileRoute("/signin")({
  component: () => {
    const navigate = Route.useNavigate();
    return (
      <ContentLayout isCentered>
        <SignInForm
          onSuccess={() => navigate({ to: "/groups" })}
          onSwitch={() => navigate({ to: "/signup" })}
        />
      </ContentLayout>
    );
  },
});
