import { useTranslation } from "react-i18next";
import { MoreHorizontalIcon, PlusIcon } from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@synergy/ui";

import { copyToClipboard } from "@synergy/utils";

import { useGroup } from "~/features/groups/api/get-group";

import { useInvites } from "../api/get-invites";
import { CreateInviteDialog } from "./create-invite";
import { DeleteInviteDialog } from "./delete-invite";

type InvitesListProps = Readonly<{
  groupId: string;
}>;

export const InvitesList = ({ groupId }: InvitesListProps) => {
  const { t } = useTranslation();

  const { data: group } = useGroup(groupId);
  const { data: invites } = useInvites(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.invite.id")}</TableHead>
          <TableHead>{t("client.feature.invite.expires_at")}</TableHead>
          <TableHead className="flex items-center float-end">
            <CreateInviteDialog groupId={groupId}>
              <Button
                className="w-8 h-8"
                variant="ghost"
              >
                <PlusIcon />
              </Button>
            </CreateInviteDialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invites?.map(({ id, expiresAt }) => (
          <TableRow key={id}>
            <TableCell className="select-text">
              {group?.id}-{id}
            </TableCell>
            <TableCell>
              {expiresAt.getFullYear() < 5000 // very dumb
                ? expiresAt.toLocaleString()
                : t("client.time.never")}
            </TableCell>
            <TableCell className="flex items-center float-end">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-secondary rounded-md focus:outline-none">
                  <MoreHorizontalIcon
                    className="p-2"
                    size={32}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        copyToClipboard(
                          `https://synergy-app.net/invite/${group?.id}-${id}`
                        );
                      }}
                    >
                      {t("client.action.copy")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DeleteInviteDialog
                      groupId={groupId}
                      inviteId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.delete")}
                      </DropdownMenuItem>
                    </DeleteInviteDialog>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
InvitesList.displayName = "InvitesList";
