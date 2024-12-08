import { db } from "@/libs/firebase";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { FindGroupsQueryOptions } from "../types/find-groups";

export const findGroups = async (uid: string) => {
  const { docs: memberDocs } = await getDocs(
    query(collectionGroup(db, "members"), where("uid", "==", uid))
  );
  return memberDocs.map((doc) => doc.ref.parent.parent!.id);
};

export const findGroupsQueryOptions = (uid: string) => {
  return {
    queryKey: ["groups"],
    queryFn: () => findGroups(uid),
  } satisfies FindGroupsQueryOptions;
};
