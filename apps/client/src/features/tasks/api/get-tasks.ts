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

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  assignedTo: z.string().array(),
  createdBy: z.string(),
  createdAt: z.date(),
});

export type Task = z.infer<typeof taskSchema>;

type GetTasksOptions = QueryOptions<Task[], FirestoreError, Task[], string[]>;

export const getTasksOptions = (
  queryClient: QueryClient,
  groupId: string,
  boardId: string
) => {
  return {
    queryKey: ["groups", groupId, "boards", boardId, "tasks"],
    queryFn: ({ queryKey }) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "boards", boardId, "tasks"),
          (snapshot) => {
            const parsedTasks = snapshot.docs.map((doc) => {
              const data = doc.data({
                serverTimestamps: "estimate",
              });
              return taskSchema.safeParse({
                id: doc.id,
                name: data?.name,
                description: data?.description,
                assignedTo: data?.assignedTo,
                createdBy: data?.createdBy,
                createdAt: data?.createdAt.toDate(),
              } satisfies Task);
            });

            const tasks = parsedTasks
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(tasks);
            queryClient.setQueryData(queryKey, tasks);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetTasksOptions;
};

type UseTasksOptions = UseQueryOptions<
  Task[],
  FirestoreError,
  Task[],
  string[]
>;

export const useTasks = (
  groupId: string,
  boardId: string,
  options?: Partial<UseTasksOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getTasksOptions(queryClient, groupId, boardId),
  } satisfies UseTasksOptions);
};

export const useTask = (
  groupId: string,
  boardId: string,
  taskId: string,
  options?: Partial<UseTasksOptions>
) => {
  const tasks = useTasks(groupId, boardId, options);
  const { data, ...rest } = tasks;
  return {
    ...rest,
    data: tasks.data?.find(({ id }) => id == taskId),
  };
};
