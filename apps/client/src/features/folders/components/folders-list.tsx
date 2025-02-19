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
import { useTranslation } from "@synergy/i18n";

type FoldersListProps = Readonly<{
  groupId: string;
}>;

export const FoldersList = ({ groupId }: FoldersListProps) => {
  const { data: folders } = useFolders(groupId);

  const { t } = useTranslation();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("folder.name")}</TableHead>
          <TableHead className="float-end">
            <div className="flex items-center h-full">
              <CreateFolderDialog groupId={groupId}>
                <Button
                  className="w-8 h-8"
                  variant="ghost"
                >
                  <PlusIcon />
                </Button>
              </CreateFolderDialog>
            </div>
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
                  <DropdownMenuLabel>{t("folder.manage")}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <UpdateFolderDialog
                      groupId={groupId}
                      folderId={id}
                    >
                      <DropdownMenuItem
                        onSelect={(event) => event.preventDefault()}
                      >
                        {t("generic.edit")}
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
                        {t("generic.delete")}
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
