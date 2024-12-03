import { db } from "@/libs/firebase";
import { UseQueryOptions } from "@tanstack/react-query";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";

export const findGroups = async (uid: string) => {
  const { docs: memberDocs } = await getDocs(
    query(collectionGroup(db, "members"), where("uid", "==", uid))
  );
  return memberDocs.map((doc) => doc.ref.parent.parent!.id);
};

export const findGroupsQueryOptions = (uid: string) => {
  return {
    queryKey: ["groups", uid],
    queryFn: () => findGroups(uid),
  } satisfies UseQueryOptions;
};
