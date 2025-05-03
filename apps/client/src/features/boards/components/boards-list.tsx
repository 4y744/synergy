import { useTranslation } from "react-i18next";
import { ClipboardListIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

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

import { useBoards } from "../api/get-boards";
import { CreateBoardDialog } from "./create-board";
import { UpdateBoardDialog } from "./update-board";
import { DeleteBoardDialog } from "./delete-board";

type BoardsListProps = Readonly<{
  groupId: string;
}>;

export const BoardsList = ({ groupId }: BoardsListProps) => {
  const { data: boards } = useBoards(groupId);
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.board.name")}</TableHead>
          <TableHead className="flex items-center float-end">
            <CreateBoardDialog groupId={groupId}>
              <Button
                className="w-8 h-8"
                variant="ghost"
              >
                <PlusIcon />
              </Button>
            </CreateBoardDialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {boards?.map(({ id, name }) => (
          <TableRow key={id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <ClipboardListIcon size={16} />
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
                    <UpdateBoardDialog
                      groupId={groupId}
                      boardId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.edit")}
                      </DropdownMenuItem>
                    </UpdateBoardDialog>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DeleteBoardDialog
                      groupId={groupId}
                      boardId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.delete")}
                      </DropdownMenuItem>
                    </DeleteBoardDialog>
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
BoardsList.displayName = "BoardsList";
