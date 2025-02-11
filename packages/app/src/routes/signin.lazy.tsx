import { createLazyFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@synergy/features/auth";

import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/signin")({
  component: () => {
    const navigate = Route.useNavigate();
    return (
      <Content isCentered>
        <SignInForm
          onSuccess={() => navigate({ to: "/groups" })}
          onSwitch={() => navigate({ to: "/signup" })}
        />
      </Content>
    );
  },
});
