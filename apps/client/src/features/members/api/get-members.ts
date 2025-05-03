import {
  QueryClient,
  QueryOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const memberSchema = z.object({
  uid: z.string(),
});

export type Member = z.infer<typeof memberSchema>;

type GetMembersOptions = QueryOptions<
  Member[],
  FirestoreError,
  Member[],
  string[]
>;

export const getMembersOptions = (
  queryClient: QueryClient,
  groupId: string
) => {
  return {
    queryKey: ["groups", groupId, "members"],
    queryFn: ({ queryKey }) => {
      return new Promise<Member[]>((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "members"),
          (snapshot) => {
            const parsedMembers = snapshot.docs.map((doc) => {
              const { uid } = doc.data({ serverTimestamps: "estimate" });
              return memberSchema.safeParse({
                uid,
              } satisfies Member);
            });

            const members = parsedMembers
              .filter(({ success }) => success)
              .filter(({ data }) => data?.uid)
              .map(({ data }) => data!);

            resolve(members);
            queryClient.setQueryData(queryKey, members);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetMembersOptions;
};

type UseMembersOptions = UseQueryOptions<
  Member[],
  FirestoreError,
  Member[],
  string[]
>;

export const useMembers = (
  groupId: string,
  options?: Partial<UseMembersOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getMembersOptions(queryClient, groupId),
  } satisfies UseMembersOptions);
};
