import { createFileRoute } from "@tanstack/react-router";

import { Button, Badge } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { CLIENT_URL } from "~/config/env";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <ContentLayout isCentered>
        <div className="flex items-end gap-2">
          <h1 className="text-4xl font-arcade">synergy</h1>
          <Badge className="h-fit mb-1">v1.0</Badge>
        </div>
        <div className="flex gap-4">
          <Button
            variant="outline"
            disabled
          >
            Download
          </Button>
          <Button
            variant="secondary"
            asChild
          >
            <a href={CLIENT_URL}>Open in browser</a>
          </Button>
        </div>
      </ContentLayout>
    );
  },
});
