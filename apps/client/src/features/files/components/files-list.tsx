import { FileUpIcon, MoreHorizontalIcon } from "lucide-react";

import {
  Button,
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
import { useGroup } from "~/features/groups/hooks/use-group";

import { CreateFileDialog } from "./create-file";
import { DeleteFileDialog } from "./delete-file";
import { useFiles } from "../hooks/use-files";

import { useTranslation } from "react-i18next";

type FilesListProps = Readonly<{
  groupId: string;
  folderId: string;
}>;

export const FilesList = ({ groupId, folderId }: FilesListProps) => {
  const { uid } = useAuth();
  const { t } = useTranslation();

  const { data: group } = useGroup(groupId);
  const { data: files } = useFiles(groupId, folderId);

  return (
    <Table>
      <TableHeader>
        <TableRow className="align-middle">
          <TableHead>{t("client.feature.file.name")}</TableHead>
          <TableHead className="float-end">
            <div className="flex items-center h-full">
              <CreateFileDialog
                groupId={groupId}
                folderId={folderId}
              >
                <Button
                  className="w-8 h-8"
                  variant="ghost"
                >
                  <FileUpIcon />
                </Button>
              </CreateFileDialog>
            </div>
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
                        {t("client.action.delete")}
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
