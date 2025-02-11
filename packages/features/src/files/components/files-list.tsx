import { FileUpIcon, MoreHorizontalIcon } from "lucide-react";

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

import { CreateFileDialog } from "./create-file";
import { DeleteFileDialog } from "./delete-file";
import { useFiles } from "../hooks/use-files";

import { useAuth } from "~/auth";
import { useGroup } from "~/groups";

type FilesListProps = Readonly<{
  groupId: string;
  folderId: string;
}>;

export const FilesList = ({ groupId, folderId }: FilesListProps) => {
  const { uid } = useAuth();

  const { data: group } = useGroup(groupId);
  const { data: files } = useFiles(groupId, folderId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="float-end my-1">
            <CreateFileDialog
              groupId={groupId}
              folderId={folderId}
            >
              <Button>
                <FileUpIcon />
              </Button>
            </CreateFileDialog>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files?.map(({ id, url, name, createdBy }) => (
          <TableRow key={id}>
            <TableCell>
              <a
                className="hover:underline"
                href={url}
                target="_blank"
              >
                {name}
              </a>
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
                  <DropdownMenuLabel>Manage file</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DeleteFileDialog
                      groupId={groupId}
                      folderId={folderId}
                      fileId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                        disabled={uid != createdBy && uid != group?.createdBy}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DeleteFileDialog>
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
