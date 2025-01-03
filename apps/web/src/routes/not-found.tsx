import { Link } from "react-router-dom";

import { cn } from "@synergy/utils";
import { H1, P, Page, Separator } from "@synergy/ui";

export default () => {
  return (
    <Page centered>
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
    </Page>
  );
};
