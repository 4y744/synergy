import { doc, FirestoreError, onSnapshot } from "firebase/firestore";
import { GroupSchema } from "../types/group";
import { db } from "@synergy/libs/firebase";
import { Group } from "../types/group";
import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { Unsubscribe } from "firebase/auth";

export const getGroup = async (
  groupId: string,
  onUpdate: (group: Group) => void
) => {
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
          created: data?.created.toDate(),
        });
        resolve(group);
        onUpdate(group);
      },
      () => unsubscribe()
    );
  });
  return { group, unsubscribe };
};

export type GetGroupOptions = QueryOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;

export const getGroupOptions = (groupId: string, queryClient: QueryClient) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: async ({ queryKey }) => {
      const { group, unsubscribe } = await getGroup(groupId, (group) => {
        queryClient.setQueryData(queryKey, group);
      });
      const remove = queryClient
        .getQueryCache()
        .subscribe(({ query, type }) => {
          if (query.queryKey == queryKey && type == "removed") {
            remove();
            unsubscribe?.();
          }
        });
      return group;
    },
  } satisfies GetGroupOptions;
};
