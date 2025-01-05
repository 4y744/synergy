import { useChats, UseChatsMutationOptions } from "./use-chats";

export const useChat = (
  groupId: string,
  chatId: string,
  options?: Partial<UseChatsMutationOptions>
) => {
  const chats = useChats(groupId, options);
  const { data, ...rest } = chats;
  return {
    ...rest,
    data: chats.data?.find(({ id }) => id == chatId),
  };
};
