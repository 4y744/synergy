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

import { DeleteMemberDialog } from "./delete-member";
import { useMembers } from "../hooks/use-members";

import { useAuth } from "~/auth";
import { useUser } from "~/users";

type MemberProps = Readonly<{
  groupId: string;
  memberId: string;
}>;

const Member = ({ groupId, memberId }: MemberProps) => {
  const { uid } = useAuth();
  const { data: user } = useUser(memberId);

  return (
    <TableRow>
      <TableCell>{user?.username}</TableCell>
      <TableCell className="float-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="hover:bg-secondary rounded-md focus:outline-none">
            <MoreHorizontalIcon
              className="p-2"
              size={32}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Manage member</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DeleteMemberDialog
                groupId={groupId}
                memberId={memberId}
                type="kick"
              >
                <DropdownMenuItem
                  onSelect={(event) => event.preventDefault()}
                  disabled={memberId == uid}
                >
                  Kick
                </DropdownMenuItem>
              </DeleteMemberDialog>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

type MembersListProps = Readonly<{
  groupId: string;
}>;

export const MembersList = ({ groupId }: MembersListProps) => {
  const { data: members } = useMembers(groupId);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {members?.map(({ uid }) => (
          <Member
            key={uid}
            groupId={groupId}
            memberId={uid}
          />
        ))}
      </TableBody>
    </Table>
  );
};
