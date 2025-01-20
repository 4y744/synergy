import { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@synergy/ui";
import { copyToClipboard } from "@synergy/utils";
import { useCreateInvite } from "../hooks/use-create-invite";
import { useInvites } from "../hooks/use-invites";

type InvitesProps = Readonly<{
  groupId: string;
}>;

export const Invites = ({ groupId }: InvitesProps) => {
  const { data: invites } = useInvites(groupId);
  const { mutate: createInvite } = useCreateInvite(groupId);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Expiration date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invites?.map(({ id, expiresAt }) => (
            <TableRow>
              <TableCell>{id}</TableCell>
              <TableCell>{expiresAt.toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    copyToClipboard(`https://synergy-app.net/invite/${id}`);
                  }}
                >
                  Copy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button>Create invite</Button>
          </PopoverTrigger>
          <PopoverContent>
            <Button
              onClick={() =>
                createInvite({ expiresAt: new Date(17384052410000) })
              }
            >
              Generate
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
};

type InviteDialogProps = Readonly<{
  children: ReactNode;
  groupId: string;
}>;

export const InvitesDialog = ({ children, groupId }: InviteDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className="w-full"
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent className="">
        <DialogTitle>Invite</DialogTitle>
        <DialogDescription>
          Use the link below to invite people to your group.
        </DialogDescription>
        <Invites groupId={groupId} />
      </DialogContent>
    </Dialog>
  );
};
