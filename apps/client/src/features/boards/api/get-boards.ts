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

export const boardSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

export type Board = z.infer<typeof boardSchema>;

type GetBoardsOptions = QueryOptions<
  Board[],
  FirestoreError,
  Board[],
  string[]
>;

export const getBoardsOptions = (queryClient: QueryClient, groupId: string) => {
  return {
    queryKey: ["groups", groupId, "boards"],
    queryFn: ({ queryKey }) => {
      return new Promise<Board[]>((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "boards"),
          (snapshot) => {
            const parsedBoards = snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return boardSchema.safeParse({
                id: doc.id,
                name: data?.name,
                createdAt: data?.createdAt.toDate(),
              } satisfies Board);
            });

            const boards = parsedBoards
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(boards);
            queryClient.setQueryData(queryKey, boards);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetBoardsOptions;
};

type UseBoardsOptions = UseQueryOptions<
  Board[],
  FirestoreError,
  Board[],
  string[]
>;

export const useBoards = (
  groupId: string,
  options?: Partial<UseBoardsOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getBoardsOptions(queryClient, groupId),
  } satisfies UseBoardsOptions);
};

export const useBoard = (
  groupId: string,
  boardId: string,
  options?: Partial<UseBoardsOptions>
) => {
  const boards = useBoards(groupId, options);
  const { data, ...rest } = boards;
  return {
    ...rest,
    data: boards.data?.find(({ id }) => id == boardId),
  };
};
