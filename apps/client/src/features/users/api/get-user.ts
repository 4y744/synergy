import {
  QueryClient,
  QueryOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { doc, FirestoreError, onSnapshot } from "firebase/firestore";
import z from "zod";

import { db } from "@synergy/libs/firebase";

export const userSchema = z.object({
  uid: z.string(),
  username: z.string(),
  pfp: z.string().optional(),
  createdAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

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

type UseUserOptions = UseQueryOptions<User, FirestoreError, User, string[]>;

export const useUser = (uid: string, options?: Partial<UseUserOptions>) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getUserOptions(queryClient, uid),
  } satisfies UseUserOptions);
};
