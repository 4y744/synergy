import { HashIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

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

import { UpdateChatDialog } from "./update-chat";
import { DeleteChatDialog } from "./delete-chat";
import { useChats } from "../hooks/use-chats";
import { CreateChatDialog } from "./create-chat";

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
          <TableHead className="float-end my-1">
            <CreateChatDialog groupId={groupId}>
              <Button>
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
