import { MoreHorizontalIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
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

import { useInvites } from "../hooks/use-invites";
import { DeleteInviteDialog } from "./delete-invite";

type InvitesProps = Readonly<{
  groupId: string;
}>;

export const InvitesList = ({ groupId }: InvitesProps) => {
  const { data: invites } = useInvites(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Expiration date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invites?.map(({ id, expiresAt }) => (
          <TableRow key={id}>
            <TableCell>{id}</TableCell>
            <TableCell>
              {expiresAt.getFullYear() < 5000 /* :) */
                ? expiresAt.toLocaleString()
                : "never"}
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
                  <DropdownMenuLabel>Manage invite</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        copyToClipboard(`https://synergy-app.net/invite/${id}`);
                      }}
                    >
                      Copy
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
                        className="text-destructive"
                      >
                        Delete
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
