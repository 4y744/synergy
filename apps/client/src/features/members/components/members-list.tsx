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

import { useAuth } from "~/features/auth/hooks/use-auth";
import { useUser } from "~/features/users/hooks/use-user";
import { useTranslation } from "@synergy/i18n";

type MemberProps = Readonly<{
  groupId: string;
  memberId: string;
}>;

const Member = ({ groupId, memberId }: MemberProps) => {
  const { uid } = useAuth();
  const { data: user } = useUser(memberId);

  const { t } = useTranslation();

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
            <DropdownMenuLabel>{t("member.manage")}</DropdownMenuLabel>
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
                  {t("generic.kick")}
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

  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("member.name")}</TableHead>
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
