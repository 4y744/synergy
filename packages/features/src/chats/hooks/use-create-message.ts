import { useMutation } from "@tanstack/react-query";
import { createMessageMutationOptions } from "../api/create-message";

export const useCreateMessage = (groupId: string, chatId: string) => {
  return useMutation(createMessageMutationOptions(groupId, chatId));
};
