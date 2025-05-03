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

export const folderSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
});

export type Folder = z.infer<typeof folderSchema>;

type GetFoldersOptions = QueryOptions<
  Folder[],
  FirestoreError,
  Folder[],
  string[]
>;

export const getFoldersOptions = (
  queryClient: QueryClient,
  groupId: string
) => {
  return {
    queryKey: ["groups", groupId, "folders"],
    queryFn: ({ queryKey }) => {
      return new Promise<Folder[]>((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "folders"),
          (snapshot) => {
            const parsedFolders = snapshot.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              return folderSchema.safeParse({
                id: doc.id,
                name: data?.name,
                createdAt: data?.createdAt.toDate(),
              } satisfies Folder);
            });

            const folders = parsedFolders
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(folders);
            queryClient.setQueryData(queryKey, folders);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetFoldersOptions;
};

export type UseFoldersOptions = UseQueryOptions<
  Folder[],
  FirestoreError,
  Folder[],
  string[]
>;

export const useFolders = (
  groupId: string,
  options?: Partial<UseFoldersOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getFoldersOptions(queryClient, groupId),
  } satisfies UseFoldersOptions);
};

export const useFolder = (
  groupId: string,
  folderId: string,
  options?: Partial<UseFoldersOptions>
) => {
  const folder = useFolders(groupId, options);
  const { data, ...rest } = folder;
  return {
    ...rest,
    data: folder.data?.find(({ id }) => id == folderId),
  };
};
