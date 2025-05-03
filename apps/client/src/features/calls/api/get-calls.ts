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

export const callSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

export type Call = z.infer<typeof callSchema>;

type GetCallsOptions = QueryOptions<Call[], FirestoreError, Call[], string[]>;

export const getCallsOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId, "calls"],
    queryFn: ({ queryKey }) => {
      return new Promise<Call[]>((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "calls"),
          (snapshot) => {
            const parsedCalls = snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return callSchema.safeParse({
                id: doc.id,
                name: data?.name,
                createdAt: data?.createdAt.toDate(),
              } satisfies Call);
            });

            const calls = parsedCalls
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(calls);
            queryClient.setQueryData(queryKey, calls);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetCallsOptions;
};

export type UseCallsOptions = UseQueryOptions<
  Call[],
  FirestoreError,
  Call[],
  string[]
>;

export const useCalls = (
  groupId: string,
  options?: Partial<UseCallsOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getCallsOptions(queryClient, groupId),
  } satisfies UseCallsOptions);
};

export const useCall = (
  groupId: string,
  callId: string,
  options?: Partial<UseCallsOptions>
) => {
  const calls = useCalls(groupId, options);
  const { data, ...rest } = calls;
  return {
    ...rest,
    data: calls.data?.find(({ id }) => id == callId),
  };
};
