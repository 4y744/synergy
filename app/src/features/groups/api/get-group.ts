import { doc, onSnapshot } from "firebase/firestore";
import { GroupSchema } from "../schemas/group";
import { db } from "@/libs/firebase";
import { UseQueryOptions } from "@tanstack/react-query";
import { Group } from "../types/group";

type GetGroupOptions = {
  signal?: AbortSignal;
  subscribe?: boolean;
  onUpdate?: (group: Group) => void;
};

//TODO: ADD ERROR HANDLING
export const getGroup = (groupId: string, options?: GetGroupOptions) => {
  return new Promise((resolve: (group: Group) => void) => {
    const unsubscribe = onSnapshot(
      doc(db, "groups", groupId),
      async (snapshot) => {
        const data = snapshot.data();
        const group = GroupSchema.parse({
          id: snapshot.id,
          name: data?.name,
          creator: data?.creator,
          created: new Date(data?.created.seconds),
        });
        resolve(group);
        if (options?.subscribe) {
          options?.signal?.addEventListener("abort", () => {
            unsubscribe();
          });
        } else {
          unsubscribe();
        }
        if (!options?.signal?.aborted) {
          options?.onUpdate?.(group);
        }
      }
    );
  });
};

export const getGroupQueryOptions = (
  groupId: string,
  options?: {
    subscribe?: boolean;
    onUpdate?: (group: Group) => void;
  }
) => {
  return {
    queryKey: ["group", groupId],
    queryFn: ({ signal }) => {
      return getGroup(groupId, {
        ...options,
        signal,
      });
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  } satisfies UseQueryOptions;
};
