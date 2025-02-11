import { QueryClient, QueryOptions } from "@tanstack/react-query";

import { Unsubscribe } from "firebase/auth";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";

import { ZodError } from "zod";

import { registerQuerySubscription } from "@synergy/libs/react-query";

import { db } from "@synergy/libs/firebase";

import { Invite, inviteSchema } from "../types/invite";

const getInvites = async (
  groupId: string,
  options?: {
    onUpdate?: (invites: Invite[]) => void;
    onError?: (error: FirestoreError | ZodError<Invite[]>) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const invites = await new Promise(
    (
      resolve: (invites: Invite[]) => void,
      reject: (error: ZodError<Invite[]>) => void
    ) => {
      unsubscribe = onSnapshot(
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
            options?.onUpdate?.(invites.data);
          } else {
            reject(invites.error);
            options?.onError?.(invites.error);
          }
        },
        options?.onError
      );
    }
  );
  return { invites, unsubscribe };
};

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
    queryFn: async ({ queryKey }) => {
      const { invites, unsubscribe } = await getInvites(groupId, {
        onUpdate: (invites) => {
          queryClient.setQueryData(queryKey, invites);
        },
        onError: () => {
          queryClient.removeQueries({ queryKey });
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return invites;
    },
  } satisfies GetInvitesOptions;
};
