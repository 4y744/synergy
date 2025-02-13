import { QueryClient, QueryOptions } from "@tanstack/react-query";
import { collection, FirestoreError, onSnapshot } from "firebase/firestore";
import { ZodError } from "zod";

import { db } from "@synergy/libs/firebase";

import { Member, memberSchema } from "../types/member";

type GetMembersOptions = QueryOptions<
  Member[],
  FirestoreError | ZodError<Member[]>,
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
        const unsubscribe = onSnapshot(
          collection(db, "groups", groupId, "members"),
          (snapshot) => {
            const members = memberSchema.array().safeParse(
              snapshot.docs.map((doc) => {
                const { uid } = doc.data({ serverTimestamps: "estimate" });
                return {
                  uid,
                } satisfies Member;
              })
            );

            if (members.success) {
              resolve(members.data);
              queryClient.setQueryData(queryKey, members.data);
            } else {
              unsubscribe();
              reject(members.error);
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
  } satisfies GetMembersOptions;
};
