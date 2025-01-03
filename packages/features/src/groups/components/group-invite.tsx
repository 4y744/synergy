import { Button, Input } from "@synergy/ui";
import { cn, copyToClipboard } from "@synergy/utils";

type GroupInviteProps = Readonly<{
  groupId: string;
}>;

export const GroupInvite = ({ groupId }: GroupInviteProps) => {
  return (
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
  );
};
