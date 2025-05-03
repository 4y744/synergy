import { useEffect } from "react";
import { MicIcon, MicOffIcon } from "lucide-react";

import { Button } from "@synergy/ui";

import { useAuth } from "~/features/auth/hooks/use-auth";

import { useUpdateParticipant } from "../api/update-participant";
import { useParticipants } from "../api/get-participants";

type UpdateParticipantProps = Readonly<{
  groupId: string;
  callId: string;
}>;

export const UpdateParticipant = ({
  groupId,
  callId,
}: UpdateParticipantProps) => {
  const { uid } = useAuth();

  const { data: participants, isPending } = useParticipants(groupId, callId);

  const { isMuted } = participants?.find(({ uid: _uid }) => _uid == uid)!;

  const { mutate: updateParticipant } = useUpdateParticipant(groupId, callId, {
    // When muted we go through each participant and mute our localStream to them.
    onSuccess: async () => {
      participants
        ?.filter(({ uid: _uid }) => _uid != uid)
        .forEach(({ localStream }) => {
          localStream?.getAudioTracks().forEach((track) => {
            track.enabled = !isMuted;
          });
        });
    },
  });

  useEffect(() => {
    // When the participants are modified we enforce isMuted in case new ones are added.
    participants
      ?.filter(({ uid: _uid }) => _uid != uid)
      .forEach(({ localStream }) => {
        localStream?.getAudioTracks().forEach((track) => {
          track.enabled = !isMuted;
        });
      });
  }, [participants]);

  if (isPending) {
    return <></>;
  }

  return (
    <Button
      variant="secondary"
      onClick={() => updateParticipant({ isMuted: !isMuted })}
    >
      {isMuted ? <MicOffIcon /> : <MicIcon />}
    </Button>
  );
};
UpdateParticipant.displayName = "UpdateParticipant";
