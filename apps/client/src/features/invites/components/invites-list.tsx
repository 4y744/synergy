import { MoreHorizontalIcon, PlusIcon } from "lucide-react";

import { useTranslation } from "react-i18next";

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

import { CreateInviteDialog } from "./create-invite";
import { DeleteInviteDialog } from "./delete-invite";
import { useInvites } from "../hooks/use-invites";

type InvitesListProps = Readonly<{
  groupId: string;
}>;

export const InvitesList = ({ groupId }: InvitesListProps) => {
  const { t } = useTranslation();
  const { data: invites } = useInvites(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.invite.id")}</TableHead>
          <TableHead>{t("client.feature.invite.expires_at")}</TableHead>
          <TableHead className="float-end">
            <div className="flex items-center h-full">
              <CreateInviteDialog groupId={groupId}>
                <Button
                  className="w-8 h-8"
                  variant="ghost"
                >
                  <PlusIcon />
                </Button>
              </CreateInviteDialog>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invites?.map(({ id, expiresAt }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>
              {expiresAt.getFullYear() < 5000 // very dumb
                ? expiresAt.toLocaleString()
                : t("client.time.never")}
            </TableCell>
            <TableCell className="float-end">
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
                        copyToClipboard(`https://synergy-app.net/invite/${id}`);
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
