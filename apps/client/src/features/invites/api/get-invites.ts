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

export const inviteSchema = z.object({
  id: z.string(),
  expiresAt: z.date(),
});

export type Invite = z.infer<typeof inviteSchema>;

type GetInvitesOptions = QueryOptions<
  Invite[],
  FirestoreError,
  Invite[],
  string[]
>;

export const getInvitesOptions = (
  queryClient: QueryClient,
  groupId: string
) => {
  return {
    queryKey: ["groups", groupId, "invites"],
    queryFn: ({ queryKey }) => {
      return new Promise<Invite[]>((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "invites"),
          (snapshot) => {
            const parsedInvites = snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return inviteSchema.safeParse({
                id: doc.id,
                expiresAt: data?.expiresAt.toDate(),
              } as Invite);
            });

            const invites = parsedInvites
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(invites);
            queryClient.setQueryData(queryKey, invites);
          },
          (error) => {
            reject(error);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetInvitesOptions;
};

type UseInvitesOptions = UseQueryOptions<
  Invite[],
  FirestoreError,
  Invite[],
  string[]
>;

export const useInvites = (
  groupId: string,
  options?: Partial<UseInvitesOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getInvitesOptions(queryClient, groupId),
  } satisfies UseInvitesOptions);
};
