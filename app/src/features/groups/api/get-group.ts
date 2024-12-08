import { doc, getDoc } from "firebase/firestore";
import { GroupQueryOptions, GroupSchema } from "../types/group";
import { db } from "@/libs/firebase";

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

export const getGroupQueryOptions = (groupId: string) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: () => getGroup(groupId),
  } satisfies GroupQueryOptions;
};
