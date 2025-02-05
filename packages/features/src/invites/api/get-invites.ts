import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { Unsubscribe } from "firebase/auth";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { Invite, inviteSchema } from "../types/invite";
import { registerQuerySubscription } from "@synergy/libs/react-query";

const getInvites = async (
  groupId: string,
  options?: {
    onUpdate?: (invites: Invite[]) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const invites = await new Promise((resolve: (invites: Invite[]) => void) => {
    unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "invites"),
      (snapshot) => {
        const invites = inviteSchema.array().parse(
          snapshot.docs.map((doc) => {
            const data = doc.data({ serverTimestamps: "estimate" });
            return {
              id: doc.id,
              expiresAt: data?.expiresAt.toDate(),
            } satisfies Invite;
          })
        );
        resolve(invites);
        options?.onUpdate?.(invites);
      },
      unsubscribe
    );
  });
  return { invites, unsubscribe };
};

type GetInvitesOptions = QueryOptions<
  Invite[],
  FirestoreError,
  Invite[],
  string[]
>;

export const getInvitesOptions = (
  groupId: string,
  queryClient: QueryClient
) => {
  return {
    queryKey: ["groups", groupId, "invites"],
    queryFn: async ({ queryKey }) => {
      const { invites, unsubscribe } = await getInvites(groupId, {
        onUpdate: (invites) => {
          queryClient.setQueryData(queryKey, invites);
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return invites;
    },
  } satisfies GetInvitesOptions;
};
