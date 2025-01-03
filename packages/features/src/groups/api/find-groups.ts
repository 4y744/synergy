import { db } from "@synergy/libs/firebase";
import { QueryOptions } from "@tanstack/react-query";
import {
  collectionGroup,
  FirestoreError,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const findGroups = async (uid: string) => {
  const { docs: memberDocs } = await getDocs(
    query(collectionGroup(db, "members"), where("uid", "==", uid))
  );
  return memberDocs.map((doc) => doc.ref.parent.parent!.id);
};

export type FindGroupsQueryOptions = QueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const findGroupsQueryOptions = (uid: string) => {
  return {
    queryKey: ["groups"],
    queryFn: () => findGroups(uid),
  } satisfies FindGroupsQueryOptions;
};
