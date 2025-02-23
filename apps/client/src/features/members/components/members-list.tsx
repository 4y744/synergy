import { MoreHorizontalIcon } from "lucide-react";

import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@synergy/ui";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { useUser } from "~/features/users/hooks/use-user";

import { DeleteMemberDialog } from "./delete-member";
import { useMembers } from "../hooks/use-members";

type MemberProps = Readonly<{
  groupId: string;
  memberId: string;
}>;

const Member = ({ groupId, memberId }: MemberProps) => {
  const { t } = useTranslation();

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
                  {t("client.action.kick")}
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
  const { t } = useTranslation();
  const { data: members } = useMembers(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.member.name")}</TableHead>
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
