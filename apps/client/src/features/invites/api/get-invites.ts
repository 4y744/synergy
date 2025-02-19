import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { Invite, inviteSchema } from "../types/invite";

type GetInvitesOptions = QueryOptions<
  Invite[],
  FirestoreError | ZodError<Invite[]>,
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
        const unsubscribe = onSnapshot(
          collection(db, "groups", groupId, "invites"),
          (snapshot) => {
            const invites = inviteSchema.array().safeParse(
              snapshot.docs.map((doc) => {
                const data = doc.data({ serverTimestamps: "estimate" });
                return {
                  id: doc.id,
                  expiresAt: data?.expiresAt.toDate(),
                } satisfies Invite;
              })
            );

            if (invites.success) {
              resolve(invites.data);
              queryClient.setQueryData(queryKey, invites.data);
            } else {
              unsubscribe();
              reject(invites.error);
              queryClient.removeQueries({ queryKey });
            }
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetInvitesOptions;
};
