import { getGroupQueryOptions } from "../api/get-group";
import { UseCreateGroupMutationOptions } from "../types/create-group";
import { createGroupMutationOptions } from "./../api/create-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGroup = (options?: UseCreateGroupMutationOptions) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    ...createGroupMutationOptions(),
    onSuccess: async (groupId) => {
      await queryClient.fetchQuery(getGroupQueryOptions(groupId));
      queryClient.setQueryData(["groups"], (prev: string[]) => [
        ...prev,
        groupId,
      ]);
    },
  });
};
