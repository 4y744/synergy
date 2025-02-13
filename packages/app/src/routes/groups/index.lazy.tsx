import { createLazyFileRoute } from "@tanstack/react-router";

import { CreateGroupDialog } from "@synergy/features/groups";
import { CreateMemberDialog } from "@synergy/features/members";
import { Button, Muted } from "@synergy/ui";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/")({
  component: () => {
    return (
      <>
        <Topbar />
        <ContentLayout isCentered>
          <Muted>Looks like you aren't part of any groups...</Muted>
          <div>
            <CreateGroupDialog>
              <Button variant="link">Create a group</Button>
            </CreateGroupDialog>
            /
            <CreateMemberDialog>
              <Button variant="link">Join a group</Button>
            </CreateMemberDialog>
          </div>
        </ContentLayout>
      </>
    );
  },
});
