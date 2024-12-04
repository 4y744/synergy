import { doc, getDoc } from "firebase/firestore";
import { GroupSchema } from "../schemas/group";
import { db } from "@/libs/firebase";
import { UseQueryOptions } from "@tanstack/react-query";

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
    queryKey: ["group", groupId],
    queryFn: () => getGroup(groupId),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  } satisfies UseQueryOptions;
};
