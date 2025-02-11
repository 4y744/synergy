import { QueryClient, QueryOptions } from "@tanstack/react-query";

import {
  collectionGroup,
  FirestoreError,
  onSnapshot,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";
import { registerQuerySubscription } from "@synergy/libs/react-query";

const findGroups = async (options?: {
  onUpdate?: (groups: string[]) => void;
  onError?: (error: FirestoreError) => void;
}) => {
  let unsubscribe!: Unsubscribe;
  const groups = await new Promise((resolve: (groups: string[]) => void) => {
    unsubscribe = onSnapshot(
      query(
        collectionGroup(db, "members"),
        where("uid", "==", auth.currentUser!.uid)
      ),
      async (snapshot) => {
        const groups = snapshot.docs.map((doc) => doc.ref.parent.parent!.id);

        // Workaround for an *issue* caused by onSnapshot
        // being called before the db rules are aware of it.
        // updateDoc forces it to wait until the document
        // is universally available to avoid errors.
        await Promise.all(
          snapshot
            .docChanges()
            .map(({ doc, type }) => type == "added" && updateDoc(doc.ref, {}))
        );

        resolve(groups);
        options?.onUpdate?.(groups);
      },
      options?.onError
    );
  });
  return { groups, unsubscribe };
};

type FindGroupsOptions = QueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const findGroupsOptions = (queryClient: QueryClient) => {
  return {
    queryKey: ["groups"],
    queryFn: async ({ queryKey }) => {
      const { groups, unsubscribe } = await findGroups({
        onUpdate: async (groups) => {
          queryClient.setQueryData(queryKey, groups);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return groups;
    },
  } satisfies FindGroupsOptions;
};
