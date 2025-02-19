import { QueryClient, QueryOptions } from "@tanstack/react-query";

import { doc, FirestoreError, onSnapshot } from "firebase/firestore";

import { db } from "@synergy/libs/firebase";
import { User, userSchema } from "../types/user";

type GetUserOptions = QueryOptions<User, FirestoreError, User, string[]>;

export const getUserOptions = (queryClient: QueryClient, uid: string) => {
  return {
    queryKey: ["users", uid],
    queryFn: async ({ queryKey }) => {
      return new Promise<User>((resolve, reject) => {
        const unsubscribe = onSnapshot(
          doc(db, "users", uid),
          (snapshot) => {
            const data = snapshot.data({ serverTimestamps: "estimate" });
            const user = userSchema.safeParse({
              uid,
              username: data?.username,
              pfp: data?.pfp,
              createdAt: data?.createdAt.toDate(),
            } satisfies User);

            if (user.success) {
              resolve(user.data);
              queryClient.setQueryData(queryKey, user.data);
            } else {
              unsubscribe();
              reject(user.error);
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
  } satisfies GetUserOptions;
};
