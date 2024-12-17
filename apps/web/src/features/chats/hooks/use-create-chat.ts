import { useMutation } from "@tanstack/react-query";
import { CreateChatMutationOptions } from "../api/create-chat";

export const useCreateChat = (groupId: string) => {
  return useMutation(CreateChatMutationOptions(groupId));
};
