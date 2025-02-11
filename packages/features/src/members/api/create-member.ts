import { MutationOptions } from "@tanstack/react-query";

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

export const createMemberOptions = () => {
  return {
    mutationFn: (data) => createMember(data),
  } satisfies CreateMemberOptions;
};
