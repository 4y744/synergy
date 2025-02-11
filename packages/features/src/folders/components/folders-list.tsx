import { FolderIcon, MoreHorizontalIcon, PlusIcon } from "lucide-react";

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

import { UpdateFolderDialog } from "./update-folder";
import { DeleteFolderDialog } from "./delete-folder";
import { useFolders } from "../hooks/use-folders";
import { CreateFolderDialog } from "./create-folder";

type FoldersListProps = Readonly<{
  groupId: string;
}>;

export const FoldersList = ({ groupId }: FoldersListProps) => {
  const { data: folders } = useFolders(groupId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="float-end my-1">
            <CreateFolderDialog groupId={groupId}>
              <Button>
                <PlusIcon />
              </Button>
            </CreateFolderDialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {folders?.map(({ id, name }) => (
          <TableRow key={id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <FolderIcon size={16} />
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
                  <DropdownMenuLabel>Mange folder</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <UpdateFolderDialog
                      groupId={groupId}
                      folderId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        Edit
                      </DropdownMenuItem>
                    </UpdateFolderDialog>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DeleteFolderDialog
                      groupId={groupId}
                      folderId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DeleteFolderDialog>
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
