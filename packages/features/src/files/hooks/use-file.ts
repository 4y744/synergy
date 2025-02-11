import { useFiles, UseFilesOptions } from "./use-files";

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
