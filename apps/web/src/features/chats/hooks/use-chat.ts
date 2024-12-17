import { useChats } from "./use-chats";

export const useChat = (groupId: string, chatId: string) => {
  const chats = useChats(groupId);
  const { data, ...rest } = chats;
  return {
    ...rest,
    data: chats.data?.find(({ id }) => id == chatId),
  };
};
