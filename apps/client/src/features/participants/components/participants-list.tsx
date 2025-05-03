import { useEffect, useRef } from "react";
import { MicIcon, MicOffIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@synergy/ui";
import { abbreviate } from "@synergy/utils";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { useUser } from "~/features/users/api/get-user";

import { useParticipant, useParticipants } from "../api/get-participants";
import { UpdateParticipant } from "./update-participants";
import { DeleteParticipant } from "./delete-participant";

type ParticipantsListProps = Readonly<{
  groupId: string;
  callId: string;
}>;

export const ParticipantsList = ({
  groupId,
  callId,
}: ParticipantsListProps) => {
  const { uid } = useAuth();
  const { data: participants, isPending } = useParticipants(groupId, callId);

  if (isPending) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2 ml-2 pl-4 border-l border-l-sidebar-border">
      {participants?.map(({ uid }) => (
        <Participant
          groupId={groupId}
          callId={callId}
          uid={uid}
          key={uid}
        />
      ))}
      {participants?.find(({ uid: _uid }) => _uid == uid) && (
        <div className="grid grid-cols-2 gap-2">
          <UpdateParticipant
            groupId={groupId}
            callId={callId}
          />
          <DeleteParticipant
            groupId={groupId}
            callId={callId}
          />
        </div>
      )}
    </div>
  );
};
ParticipantsList.displayName = "ParticipantsList";

type ParticipantProps = Readonly<{
  groupId: string;
  callId: string;
  uid: string;
}>;

const Participant = ({ groupId, callId, uid }: ParticipantProps) => {
  const { data: participant } = useParticipant(groupId, callId, uid);
  const { data: user, isPending } = useUser(uid);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (participant?.remoteStream && audioRef.current) {
      audioRef.current.srcObject = participant?.remoteStream;
    }
  }, [participant?.remoteStream]);

  if (isPending) {
    return <></>;
  }

  return (
    <div className="flex items-center gap-2">
      <audio
        autoPlay
        ref={audioRef}
      />
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.pfp} />
        <AvatarFallback className="text-xs">
          {abbreviate(user!.username)}
        </AvatarFallback>
      </Avatar>
      <span className="font-medium">{user?.username}</span>
      <div className="ml-auto mr-2">
        {participant!.isMuted ? (
          <MicOffIcon size={12} />
        ) : (
          <MicIcon size={12} />
        )}
      </div>
    </div>
  );
};
Participant.displayName = "ParticipantsList:Participant";
