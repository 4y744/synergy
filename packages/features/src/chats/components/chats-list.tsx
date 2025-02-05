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

import { UpdateChatDialog } from "./update-chat";
import { DeleteChatDialog } from "./delete-chat";
import { useChats } from "../hooks/use-chats";

type ChatsListProps = Readonly<{
  groupId: string;
}>;

export const ChatsList = ({ groupId }: ChatsListProps) => {
  const { data: chats } = useChats(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chats?.map(({ id, name, createdAt }) => (
          <TableRow key={id}>
            <TableCell>{name}</TableCell>
            <TableCell>{createdAt.toLocaleString()}</TableCell>
            <TableCell className="float-end">
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:bg-secondary rounded-md focus:outline-none">
                  <MoreHorizontalIcon
                    className="p-2"
                    size={32}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Mange chat</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <UpdateChatDialog
                      groupId={groupId}
                      chatId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        Edit
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
                        className="text-destructive"
                      >
                        Delete
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
