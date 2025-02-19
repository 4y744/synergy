import { useFolders, UseFoldersOptions } from "./use-folders";

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
