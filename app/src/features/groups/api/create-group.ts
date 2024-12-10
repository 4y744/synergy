import { db } from "@/libs/firebase";
import {
  addDoc,
  collection,
  doc,
  FirestoreError,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { MutationOptions, QueryClient } from "@tanstack/react-query";
import { NewGroup } from "../types/group";

export const createGroup = async (name: string, uid: string) => {
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

export type CreateGroupMutationOptions = MutationOptions<
  string,
  FirestoreError,
  NewGroup
>;

export const createGroupMutationOptions = (queryClient: QueryClient) => {
  return {
    mutationKey: ["groups", "create"],
    mutationFn: ({ name, uid }) => createGroup(name, uid),
    onSuccess: (groupId) => {
      queryClient.setQueryData(["groups"], (prev: string[]) => [
        ...prev,
        groupId,
      ]);
    },
  } satisfies CreateGroupMutationOptions;
};
