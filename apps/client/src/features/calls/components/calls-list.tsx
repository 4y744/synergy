import { useTranslation } from "react-i18next";
import { HashIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

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

import { useCalls } from "../api/get-calls";
import { CreateCallDialog } from "./create-call";
import { UpdateCallDialog } from "./update-call";
import { DeleteCallDialog } from "./delete-call";

type CallsListProps = Readonly<{
  groupId: string;
}>;

export const CallsList = ({ groupId }: CallsListProps) => {
  const { data: calls } = useCalls(groupId);
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.call.name")}</TableHead>
          <TableHead className="flex items-center float-end">
            <CreateCallDialog groupId={groupId}>
              <Button
                className="w-8 h-8"
                variant="ghost"
              >
                <PlusIcon />
              </Button>
            </CreateCallDialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {calls?.map(({ id, name }) => (
          <TableRow key={id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <HashIcon size={16} />
                {name}
              </div>
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
                    <UpdateCallDialog
                      groupId={groupId}
                      callId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.edit")}
                      </DropdownMenuItem>
                    </UpdateCallDialog>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DeleteCallDialog
                      groupId={groupId}
                      callId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.delete")}
                      </DropdownMenuItem>
                    </DeleteCallDialog>
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
CallsList.displayName = "CallsList";
