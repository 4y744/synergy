import { ReactNode } from "react";

import { useAuth } from "~/features/auth/hooks/use-auth";

import { useCreateParticipant } from "../api/create-participant";
import { useParticipants } from "../api/get-participants";

type CreateParticipantProps = Readonly<{
  children: ReactNode;
  groupId: string;
  callId: string;
}>;

export const CreateParticipant = ({
  children,
  groupId,
  callId,
}: CreateParticipantProps) => {
  const { uid } = useAuth();

  const { data: participants, isPending } = useParticipants(groupId, callId);
  const { mutate: createParticipant } = useCreateParticipant(groupId, callId);

  if (isPending) {
    return <></>;
  }

  return (
    <div
      onClick={() => {
        if (!participants?.find(({ uid: _uid }) => _uid == uid)) {
          createParticipant();
        }
      }}
    >
      {children}
    </div>
  );
};
CreateParticipant.displayName = "CreateParticipant";
