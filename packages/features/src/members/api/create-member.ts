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

import { auth, db } from "@synergy/libs/firebase";

import { CreateMemberInput } from "../types/create-member";

import { getGroupOptions } from "~/groups";

const createMember = async (data: CreateMemberInput) => {
  const { docs: invitesDocs } = await getDocs(
    query(
      collectionGroup(db, "invites"),
      where("inviteId", "==", data.inviteId)
    )
  );
  const groupId = invitesDocs[0].ref.parent.parent?.id!;
  await setDoc(doc(db, "groups", groupId, "members", auth.currentUser!.uid), {
    ...data,
    uid: auth.currentUser!.uid,
  });
  return groupId;
};

type CreateMemberOptions = MutationOptions<
  string,
  FirestoreError,
  CreateMemberInput
>;

export const createMemberOptions = (queryClient: QueryClient) => {
  return {
    mutationFn: async (data) => {
      const groupId = await createMember(data);
      await queryClient.fetchQuery(getGroupOptions(groupId, queryClient));
      queryClient.setQueryData(["groups"], (prev: string[]) => [
        ...prev,
        groupId,
      ]);
      return groupId;
    },
  } satisfies CreateMemberOptions;
};
