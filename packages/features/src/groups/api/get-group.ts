import { Unsubscribe } from "firebase/auth";
import { doc, FirestoreError, onSnapshot } from "firebase/firestore";
import { QueryClient, QueryOptions } from "@tanstack/react-query";

import { db } from "@synergy/libs/firebase";
import { registerQuerySubscription } from "@synergy/libs/react-query";

import { Group, GroupSchema } from "../types/group";

const getGroup = async (groupId: string, onUpdate: (group: Group) => void) => {
  let unsubscribe!: Unsubscribe;
  const group = await new Promise((resolve: (group: Group) => void) => {
    unsubscribe = onSnapshot(
      doc(db, "groups", groupId),
      (snapshot) => {
        const data = snapshot.data({ serverTimestamps: "estimate" });
        const group = GroupSchema.parse({
          id: snapshot.id,
          name: data?.name,
          creator: data?.creator,
          createdAt: data?.createdAt.toDate(),
        });
        resolve(group);
        onUpdate(group);
      },
      unsubscribe
    );
  });
  return { group, unsubscribe };
};

type GetGroupOptions = QueryOptions<Group, FirestoreError, Group, string[]>;

export const getGroupOptions = (groupId: string, queryClient: QueryClient) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: async ({ queryKey }) => {
      const { group, unsubscribe } = await getGroup(groupId, (group) => {
        queryClient.setQueryData(queryKey, group);
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return group;
    },
  } satisfies GetGroupOptions;
};
