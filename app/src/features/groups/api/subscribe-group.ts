import { doc, onSnapshot } from "firebase/firestore";
import { GroupSchema } from "../schemas/group";
import { db } from "@/libs/firebase";
import { UseQueryOptions } from "@tanstack/react-query";
import { Group } from "../types/group";
export const subscribeGroup = (
  groupId: string,
  options?: {
    onUpdate?: (group: Group) => void;
    signal?: AbortSignal;
    onAbort?: () => void;
  }
) => {
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
        options?.onUpdate?.(group);
      },
      (error) => {
        /* TODO: ADD ERROR HANDLING */
      }
    );
    options?.signal?.addEventListener("abort", () => {
      unsubscribe();
      options.onAbort?.();
    });
    options?.signal?.throwIfAborted();
  });
};

export const subscribeGroupQueryOptions = (
  groupId: string,
  options?: {
    onUpdate?: (group: Group) => void;
    onAbort?: () => void;
  }
) => {
  return {
    queryKey: ["group", groupId],
    queryFn: ({ signal }) => subscribeGroup(groupId, { ...options, signal }),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  } satisfies UseQueryOptions;
};
