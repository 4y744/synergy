import { useChats, UseChatsOptions } from "./use-chats";

export const useChat = (
  groupId: string,
  chatId: string,
  options?: Partial<UseChatsOptions>
) => {
  const chats = useChats(groupId, options);
  const { data, ...rest } = chats;
  return {
    ...rest,
    data: chats.data?.find(({ id }) => id == chatId),
  };
};
