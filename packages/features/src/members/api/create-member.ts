import { auth, db } from "@synergy/libs/firebase";
import { MutationOptions, QueryClient } from "@tanstack/react-query";
import {
  collectionGroup,
  doc,
  FirestoreError,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { NewMember } from "../types/member";
import { getGroupOptions } from "~/groups";

const createMember = async (inviteId: string) => {
  const { docs: invitesDocs } = await getDocs(
    query(collectionGroup(db, "invites"), where("inviteId", "==", inviteId))
  );
  const groupId = invitesDocs[0].ref.parent.parent?.id!;
  await setDoc(doc(db, "groups", groupId, "members", auth.currentUser!.uid), {
    uid: auth.currentUser!.uid,
    inviteId,
  });
  return groupId;
};

type CreateMemberOptions = MutationOptions<string, FirestoreError, NewMember>;

export const createMemberOptions = (queryClient: QueryClient) => {
  return {
    mutationFn: async ({ inviteId }) => {
      const groupId = await createMember(inviteId);
      await queryClient.fetchQuery(getGroupOptions(groupId, queryClient));
      queryClient.setQueryData(["groups"], (prev: string[]) => [
        ...prev,
        groupId,
      ]);
      return groupId;
    },
  } satisfies CreateMemberOptions;
};
