import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { Unsubscribe } from "firebase/auth";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { Invite, InviteSchema } from "../types/invite";
import { registerQuerySubscription } from "@synergy/libs/react-query";

export const getInvites = async (
  groupId: string,
  onUpdate: (invites: Invite[]) => void
) => {
  let unsubscribe!: Unsubscribe;
  const invites = await new Promise((resolve: (invites: Invite[]) => void) => {
    unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "invites"),
      (snapshot) => {
        const invites = snapshot.docs.map((doc) => {
          const data = doc.data({ serverTimestamps: "estimate" });
          return InviteSchema.parse({
            id: doc.id,
            expiresAt: data?.expiresAt.toDate(),
          });
        });
        resolve(invites);
        onUpdate(invites);
      },
      () => unsubscribe()
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
      const { invites, unsubscribe } = await getInvites(groupId, (invites) => {
        queryClient.setQueryData(queryKey, invites);
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return invites;
    },
  } satisfies GetInvitesOptions;
};
