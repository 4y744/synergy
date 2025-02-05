import { QueryClient, QueryOptions } from "@tanstack/react-query";
import {
  collection,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";

import { Member, memberSchema } from "../types/member";
import { registerQuerySubscription } from "@synergy/libs/react-query";

const getMembers = async (
  groupId: string,
  options?: {
    onUpdate?: (members: Member[]) => void;
  }
) => {
  let unsubscribe!: Unsubscribe;
  const members = await new Promise((resolve: (members: Member[]) => void) => {
    unsubscribe = onSnapshot(
      collection(db, "groups", groupId, "members"),
      (snapshot) => {
        const members = memberSchema.array().parse(
          snapshot.docs.map((doc) => {
            const { uid } = doc.data({ serverTimestamps: "estimate" });
            return {
              uid,
            } satisfies Member;
          })
        );
        resolve(members);
        options?.onUpdate?.(members);
      }
    );
  });
  return { members, unsubscribe };
};

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
    queryFn: async ({ queryKey }) => {
      const { members, unsubscribe } = await getMembers(groupId, {
        onUpdate: (data) => {
          queryClient.setQueryData(queryKey, data);
        },
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return members;
    },
  } satisfies GetMembersOptions;
};
