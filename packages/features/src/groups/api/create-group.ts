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

import { NewGroup } from "../types/group";
import { getGroupOptions } from "./get-group";

export const createGroup = async (name: string) => {
  const uid = auth.currentUser!.uid;
  const { id: groupId } = await addDoc(collection(db, "groups"), {
    name,
    creator: uid,
    created: serverTimestamp(),
  });
  await setDoc(doc(db, "groups", groupId, "members", uid), {
    uid: uid,
  });
  return groupId;
};

export type CreateGroupOptions = MutationOptions<
  string,
  FirestoreError,
  NewGroup
>;

export const createGroupOptions = (queryClient: QueryClient) => {
  return {
    mutationFn: async ({ name }) => {
      const groupId = await createGroup(name);
      await queryClient.fetchQuery(getGroupOptions(groupId, queryClient));
      queryClient.setQueryData(["groups"], (prev: string[]) => [
        ...prev,
        groupId,
      ]);
      return groupId;
    },
  } satisfies CreateGroupOptions;
};
