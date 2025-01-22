import { ReactNode, useState } from "react";
import {
  Button,
  Calendar,
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
import { CopyIcon, Trash2 } from "lucide-react";
import { useDeleteInvite } from "../hooks/use-delete-invite";

type InvitesProps = Readonly<{
  groupId: string;
}>;

export const Invites = ({ groupId }: InvitesProps) => {
  const { data: invites } = useInvites(groupId);

  const { mutateAsync: createInvite } = useCreateInvite(groupId);
  const { mutate: deleteInvite } = useDeleteInvite(groupId);

  const [date, setDate] = useState(new Date(Date.now()));
  const [isOpen, setIsOpen] = useState(false);

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
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{expiresAt.toLocaleDateString()}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  onClick={() => {
                    copyToClipboard(`https://synergy-app.net/invite/${id}`);
                  }}
                >
                  <CopyIcon />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteInvite(id);
                  }}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div>
        <Popover
          open={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
        >
          <PopoverTrigger asChild>
            <Button className="w-full">Create invite</Button>
          </PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2 items-center">
            <span className="font-medium">Expiration date</span>
            <Calendar
              title="Expiration date"
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
            />
            <Button
              onClick={async () => {
                createInvite({ expiresAt: date });
                setIsOpen(false);
              }}
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
