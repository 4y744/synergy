import { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Input,
} from "@synergy/ui";
import { cn, copyToClipboard } from "@synergy/utils";

type GroupInviteProps = Readonly<{
  children?: ReactNode;
  groupId: string;
}>;

export const GroupInvite = ({ children, groupId }: GroupInviteProps) => {
  return (
    <Dialog>
      <DialogTrigger
        className="w-full"
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Invite</DialogTitle>
        <DialogDescription>
          Use the link below to invite people to your group.
        </DialogDescription>
        <div className={cn("flex gap-1", "text-sm")}>
          <Input
            defaultValue={`https://synergy-app.net/invite/${groupId}`}
            readOnly
          />
          <Button
            onClick={() => {
              copyToClipboard(`https://synergy-app.net/invite/${groupId}`);
            }}
          >
            Copy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
