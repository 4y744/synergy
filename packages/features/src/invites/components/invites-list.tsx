import { MoreHorizontalIcon, PlusIcon } from "lucide-react";

import {
  Button,
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
import { CreateInviteDialog } from "./create-invite";

type InvitesListProps = Readonly<{
  groupId: string;
}>;

export const InvitesList = ({ groupId }: InvitesListProps) => {
  const { data: invites } = useInvites(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Id</TableHead>
          <TableHead>Expiration date</TableHead>
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
              {expiresAt.getFullYear() <
              5000 /* :), TODO: DO THIS MORE CLEANLY */
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
