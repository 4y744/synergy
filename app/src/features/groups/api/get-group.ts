import { doc, FirestoreError, getDoc } from "firebase/firestore";
import { GroupSchema } from "../types/group";
import { db } from "@/libs/firebase";
import { Group } from "../types/group";
import { QueryOptions } from "@tanstack/react-query";

export const getGroup = async (groupId: string) => {
  const groupDoc = await getDoc(doc(db, "groups", groupId));
  const data = groupDoc.data();
  const group = GroupSchema.parse({
    id: groupDoc.id,
    name: data?.name,
    creator: data?.creator,
    created: new Date(data?.created.seconds),
  });
  return group;
};

export type GroupQueryOptions = QueryOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;

export const getGroupQueryOptions = (groupId: string) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: () => getGroup(groupId),
  } satisfies GroupQueryOptions;
};
