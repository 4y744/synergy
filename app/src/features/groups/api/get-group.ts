import { doc, FirestoreError, onSnapshot } from "firebase/firestore";
import { GroupSchema } from "../types/group";
import { db } from "@/libs/firebase";
import { Group } from "../types/group";
import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { Unsubscribe } from "firebase/auth";

export const getGroup = (groupId: string, onUpdate: (group: Group) => void) => {
  let unsubscribe: Unsubscribe;
  const group = new Promise((resolve: (group: Group) => void) => {
    onSnapshot(doc(db, "groups", groupId), async (snapshot) => {
      const data = snapshot.data();
      const group = GroupSchema.parse({
        id: snapshot.id,
        name: data?.name,
        creator: data?.creator,
        created: new Date(data?.created.seconds),
      });
      resolve(group);
      onUpdate(group);
    });
  });
  return { group, unsubscribe: unsubscribe! };
};

export type GroupQueryOptions = QueryOptions<
  Group,
  FirestoreError,
  Group,
  string[]
>;

export const getGroupQueryOptions = (
  groupId: string,
  queryClient: QueryClient
) => {
  return {
    queryKey: ["groups", groupId],
    queryFn: ({ queryKey }) => {
      const { group, unsubscribe } = getGroup(groupId, (group) => {
        queryClient.setQueryData(queryKey, group);
      });
      const remove = queryClient
        .getQueryCache()
        .subscribe(({ query, type }) => {
          if (
            query.queryKey == queryKey &&
            type == "observerRemoved" &&
            query.getObserversCount() === 0
          ) {
            remove();
            unsubscribe?.();
            queryClient.invalidateQueries({ queryKey });
          }
        });
      return group;
    },
  } satisfies GroupQueryOptions;
};
