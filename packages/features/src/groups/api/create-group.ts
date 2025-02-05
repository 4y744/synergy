import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { MutationOptions, QueryClient } from "@tanstack/react-query";

import { auth, db } from "@synergy/libs/firebase";

import { getGroupOptions } from "./get-group";
import { CreateGroupInput } from "../types/create-group";

const createGroup = async (data: CreateGroupInput) => {
  const uid = auth.currentUser!.uid;
  const { id: groupId } = await addDoc(collection(db, "groups"), {
    ...data,
    createdBy: uid,
    createdAt: serverTimestamp(),
  });
  await setDoc(doc(db, "groups", groupId, "members", uid), {
    uid,
  });
  return groupId;
};

type CreateGroupOptions = MutationOptions<
  string,
  FirestoreError,
  CreateGroupInput
>;

export const createGroupOptions = (queryClient: QueryClient) => {
  return {
    mutationFn: async (data) => {
      const groupId = await createGroup(data);
      await queryClient.fetchQuery(getGroupOptions(groupId, queryClient));
      queryClient.setQueryData(["groups"], (prev: string[]) => [
        ...prev,
        groupId,
      ]);
      return groupId;
    },
  } satisfies CreateGroupOptions;
};
