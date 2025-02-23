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

import { CreateChatDialog } from "./create-chat";
import { UpdateChatDialog } from "./update-chat";
import { DeleteChatDialog } from "./delete-chat";
import { useChats } from "../hooks/use-chats";

import { useTranslation } from "react-i18next";

type ChatsListProps = Readonly<{
  groupId: string;
}>;

export const ChatsList = ({ groupId }: ChatsListProps) => {
  const { data: chats } = useChats(groupId);
  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.chat.name")}</TableHead>
          <TableHead className="float-end">
            <div className="flex items-center h-full">
              <CreateChatDialog groupId={groupId}>
                <Button
                  className="w-8 h-8"
                  variant="ghost"
                >
                  <PlusIcon />
                </Button>
              </CreateChatDialog>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chats?.map(({ id, name }) => (
          <TableRow key={id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <HashIcon size={16} />
                {name}
              </div>
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
                    <UpdateChatDialog
                      groupId={groupId}
                      chatId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.edit")}
                      </DropdownMenuItem>
                    </UpdateChatDialog>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DeleteChatDialog
                      groupId={groupId}
                      chatId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("client.action.delete")}
                      </DropdownMenuItem>
                    </DeleteChatDialog>
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
