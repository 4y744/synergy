import { Link } from "@tanstack/react-router";
import { TriangleAlertIcon } from "lucide-react";

import { Button, H1, Separator } from "@synergy/ui";

import { ContentLayout } from "./layouts/content-layout";

export const ErrorFallback = () => {
  return (
    <ContentLayout isCentered>
      <div className="space-y-4">
        <H1 className="font-arcade">synergy</H1>
        <Separator />
        <div className="flex justify-center gap-2 font-medium text-destructive">
          <TriangleAlertIcon />
          An error has occured.
        </div>
        <Button
          variant="secondary"
          className="w-full"
          asChild
        >
          <Link to="/">Go back</Link>
        </Button>
      </div>
    </ContentLayout>
  );
};
