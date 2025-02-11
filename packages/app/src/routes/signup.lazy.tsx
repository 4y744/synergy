import { createLazyFileRoute } from "@tanstack/react-router";

import { SignUpForm } from "@synergy/features/auth";

import { Content } from "~/components/layouts/content";

export const Route = createLazyFileRoute("/signup")({
  component: () => {
    const navigate = Route.useNavigate();
    return (
      <Content isCentered>
        <SignUpForm
          onSuccess={() => navigate({ to: "/groups" })}
          onSwitch={() => navigate({ to: "/signin" })}
        />
      </Content>
    );
  },
});
