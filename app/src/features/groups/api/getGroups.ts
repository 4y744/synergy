import {
  collectionGroup,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/libs/firebase";
import { GroupSchema } from "../types";
import { queryOptions } from "@tanstack/react-query";

const getGroups = async (uid: string) => {
  const memberDocs = await getDocs(
    query(collectionGroup(db, "members"), where("uid", "==", uid))
  );
  const groupDocs = await Promise.all(
    memberDocs.docs
      .map((doc) => doc.ref.parent.parent?.id)
      .map((id) => getDoc(doc(db, "groups", `${id}`)))
  );
  console.log(groupDocs[0].data());
  const parsed = groupDocs.map((doc) =>
    GroupSchema.safeParse({
      id: doc.id,
      ...doc.data(),
    })
  );
  return parsed
    .map((group) => (group.success ? group.data : null))
    .filter((group) => group != null);
};

export const getGroupsQueryOptions = (uid: string) => {
  return queryOptions({
    queryKey: ["groups", uid],
    queryFn: () => getGroups(uid),
  });
};
