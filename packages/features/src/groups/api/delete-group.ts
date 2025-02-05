import { MutationOptions, QueryClient } from "@tanstack/react-query";
import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs,
  query,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

const deleteGroup = async (groupId: string) => {
  const { docs: memberDocs } = await getDocs(
    query(collection(db, "groups", groupId, "members"))
  );
  await Promise.all(
    memberDocs.map(({ id: memberId }) =>
      deleteDoc(doc(db, "groups", groupId, "members", memberId))
    )
  );
  await deleteDoc(doc(db, "groups", groupId));
};

type DeleteGroupOptions = MutationOptions<void, FirestoreError, void>;

export const deleteGroupOptions = (
  queryClient: QueryClient,
  groupId: string
) => {
  return {
    mutationFn: () => {
      queryClient.setQueryData(["groups"], (data: string[]) => {
        return data.filter((value) => value != groupId);
      });
      queryClient.removeQueries({ queryKey: ["groups", groupId] });
      return deleteGroup(groupId);
    },
  } satisfies DeleteGroupOptions;
};
