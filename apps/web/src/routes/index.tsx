import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Badge, H1, P, Separator } from "@synergy/ui";
import { cn } from "@synergy/utils";
import { useTranslation } from "react-i18next";
export const Route = createFileRoute("/")({
  component: () => {
    const { t } = useTranslation();
    return (
      <div
        className={cn(
          "h-screen w-screen",
          "flex flex-col justify-center items-center"
        )}
      >
        {t("hello")}
        <div className={cn("flex items-end gap-2")}>
          <h1 className="text-4xl font-bold">synergy</h1>
          <Badge className="h-fit mb-1">v0.1</Badge>
        </div>
        <span>Teamwork made simple.</span>
        <Button
          className="mt-2"
          asChild
        >
          <Link to="/groups">Get started</Link>
        </Button>
      </div>
    );
  },
  notFoundComponent: () => {
    return (
      <div className="m-auto">
        <div className={cn("flex items-center gap-5")}>
          <H1>404</H1>
          <Separator orientation="vertical" />
          <P>Oops! This page doesn't seem to exist.</P>
        </div>
        <Link
          to="/"
          className={cn(
            "text-sm text-neutral-400 underline",
            "hover:text-neutral-300",
            "transition-text duration-200"
          )}
        >
          Go to home page
        </Link>
      </div>
    );
  },
});
