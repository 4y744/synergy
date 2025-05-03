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

import { useChats } from "../api/get-chats";
import { CreateChatDialog } from "./create-chat";
import { UpdateChatDialog } from "./update-chat";
import { DeleteChatDialog } from "./delete-chat";

type ChatsListProps = Readonly<{
  groupId: string;
}>;

export const ChatsList = ({ groupId }: ChatsListProps) => {
  const { t } = useTranslation();

  const { data: chats } = useChats(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("client.feature.chat.name")}</TableHead>
          <TableHead className="flex items-center float-end">
            <CreateChatDialog groupId={groupId}>
              <Button
                className="w-8 h-8"
                variant="ghost"
              >
                <PlusIcon />
              </Button>
            </CreateChatDialog>
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
ChatsList.displayName = "ChatsList";
