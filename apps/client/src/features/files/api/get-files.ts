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

export const fileSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  createdAt: z.date(),
  createdBy: z.string(),
});

export type TFile = z.infer<typeof fileSchema>;

type GetFilesOptions = QueryOptions<TFile[], FirestoreError, TFile[], string[]>;

export const getFilesOptions = (
  queryClient: QueryClient,
  groupId: string,
  folderId: string
) => {
  return {
    queryKey: ["groups", groupId, "folders", folderId, "files"],
    queryFn: ({ queryKey }) => {
      return new Promise((resolve, reject) => {
        onSnapshot(
          collection(db, "groups", groupId, "folders", folderId, "files"),
          (snapshot) => {
            const parsedFiles = snapshot.docs.map((doc) => {
              const data = doc.data({
                serverTimestamps: "estimate",
              });
              return fileSchema.safeParse({
                id: doc.id,
                name: data?.name,
                url: data?.url,
                createdBy: data?.createdBy,
                createdAt: data?.createdAt.toDate(),
              } satisfies TFile);
            });

            const files = parsedFiles
              .filter(({ success }) => success)
              .map(({ data }) => data!);

            resolve(files);
            queryClient.setQueryData(queryKey, files);
          },
          (err) => {
            reject(err);
            queryClient.removeQueries({ queryKey });
          }
        );
      });
    },
  } satisfies GetFilesOptions;
};

type UseFilesOptions = UseQueryOptions<
  TFile[],
  FirestoreError,
  TFile[],
  string[]
>;

export const useFiles = (
  groupId: string,
  folderId: string,
  options?: Partial<UseFilesOptions>
) => {
  const queryClient = useQueryClient();
  return useQuery({
    ...options,
    ...getFilesOptions(queryClient, groupId, folderId),
  } satisfies UseFilesOptions);
};

export const useFile = (
  groupId: string,
  folderId: string,
  fileId: string,
  options?: Partial<UseFilesOptions>
) => {
  const files = useFiles(groupId, folderId, options);
  const { data, ...rest } = files;
  return {
    ...rest,
    data: files.data?.find(({ id }) => id == fileId),
  };
};
