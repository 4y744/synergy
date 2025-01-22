import { auth, db } from "@synergy/libs/firebase";
import { QueryOptions } from "@tanstack/react-query";
import {
  collectionGroup,
  FirestoreError,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const findGroups = async () => {
  const { docs: memberDocs } = await getDocs(
    query(
      collectionGroup(db, "members"),
      where("uid", "==", auth.currentUser!.uid)
    )
  );
  return memberDocs.map((doc) => doc.ref.parent.parent!.id);
};

type FindGroupsOptions = QueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const findGroupsOptions = () => {
  return {
    queryKey: ["groups"],
    queryFn: () => findGroups(),
  } satisfies FindGroupsOptions;
};
