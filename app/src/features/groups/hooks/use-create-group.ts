import { getGroupQueryOptions } from "../api/get-group";
import { createGroupMutationOptions } from "./../api/create-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    ...createGroupMutationOptions(),
    onSuccess: async (groupId) => {
      await queryClient.fetchQuery(getGroupQueryOptions(groupId));
      queryClient.setQueryData(["groups"], (old: string[]) => [
        ...old,
        groupId,
      ]);
    },
  });
};
