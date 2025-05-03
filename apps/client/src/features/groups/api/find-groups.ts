import {
  QueryClient,
  QueryOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  collectionGroup,
  FirestoreError,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { auth, db } from "@synergy/libs/firebase";

type FindGroupsOptions = QueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const findGroupsOptions = (queryClient: QueryClient) => {
  return {
    queryKey: ["groups"],
    queryFn: ({ queryKey }) => {
      return new Promise<string[]>((resolve, reject) => {
        onSnapshot(
          query(
            collectionGroup(db, "members"),
            where("uid", "==", auth.currentUser!.uid)
          ),
          async (snapshot) => {
            const groups = snapshot.docs.map(
              (doc) => doc.ref.parent.parent!.id
            );

            // Workaround for an *issue* caused by onSnapshot
            // being called before the db rules are aware of it.
            // updateDoc forces it to wait until the document
            // is universally available to avoid errors.
            await Promise.all(
              snapshot
                .docChanges()
                .map(
                  ({ doc, type }) => type == "added" && updateDoc(doc.ref, {})
                )
            );

            resolve(groups);
            queryClient.setQueryData(queryKey, groups);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies FindGroupsOptions;
};

type UseFindGroupsOptions = UseQueryOptions<
  string[],
  FirestoreError,
  string[],
  string[]
>;

export const useFindGroups = (options?: Partial<UseFindGroupsOptions>) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...findGroupsOptions(queryClient),
  } satisfies UseFindGroupsOptions);
};
