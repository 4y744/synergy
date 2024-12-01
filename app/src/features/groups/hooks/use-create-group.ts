import { createGroup } from "./../api/create-group";
import { useMutation } from "@tanstack/react-query";

export const useCreateGroup = () => {
  return useMutation({
    mutationFn: createGroup,
  });
};
