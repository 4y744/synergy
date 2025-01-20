import { QueryClient, QueryOptions } from "@tanstack/react-query";
import {
  doc,
  FirestoreError,
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

import { db } from "@synergy/libs/firebase";
import { registerQuerySubscription } from "@synergy/libs/react-query";

import { User, UserSchema } from "../types/user";

export const getUser = async (uid: string, onUpdate?: (user: User) => void) => {
  let unsubscribe!: Unsubscribe;
  const user = await new Promise((resolve: (user: User) => void) => {
    unsubscribe = onSnapshot(
      doc(db, "users", uid),
      (snapshot) => {
        const data = snapshot.data({ serverTimestamps: "estimate" });
        const user = UserSchema.parse({
          uid,
          username: data?.username,
          created: data?.created.toDate(),
        });
        resolve(user);
        onUpdate?.(user);
      },
      unsubscribe
    );
  });
  return { user, unsubscribe };
};

export type GetUserOptions = QueryOptions<User, FirestoreError, User, string[]>;

export const getUserOptions = (uid: string, queryClient: QueryClient) => {
  return {
    queryKey: ["users", uid],
    queryFn: async ({ queryKey }) => {
      const { user, unsubscribe } = await getUser(uid, (user) => {
        queryClient.setQueryData(queryKey, user);
      });
      registerQuerySubscription(queryClient, queryKey, unsubscribe);
      return user;
    },
  } satisfies GetUserOptions;
};
