import { PhoneMissedIcon } from "lucide-react";

import { Button } from "@synergy/ui";

import { useAuth } from "~/features/auth/hooks/use-auth";

import { useDeleteParticipant } from "../api/delete-participant";

type DeleteParticipantProps = Readonly<{
  groupId: string;
  callId: string;
}>;

export const DeleteParticipant = ({
  groupId,
  callId,
}: DeleteParticipantProps) => {
  const { uid } = useAuth();
  const { mutate: deleteParticipant } = useDeleteParticipant(
    groupId,
    callId,
    uid
  );

  return (
    <Button
      variant="destructive"
      onClick={() => deleteParticipant()}
    >
      <PhoneMissedIcon />
    </Button>
  );
};
DeleteParticipant.displayName = "DeleteParticipant";
