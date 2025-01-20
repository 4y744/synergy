import { QueryClient, QueryKey } from "@tanstack/react-query";

/**
 * Registers a subscription to the ```queryClient```.
 * When the chosen ```queryKey``` is removed, calls the ```unsubscribe``` function.
 * @param queryClient The query client the subscription manipulates.
 * @param queryKey  The key associated with the subscription.
 * @param unsubscribe The subscription's cleanup function.
 */
export const registerQuerySubscription = (
  queryClient: QueryClient,
  queryKey: QueryKey,
  unsubscribe: () => void
) => {
  const remove = queryClient.getQueryCache().subscribe(({ query, type }) => {
    if (query.queryKey.toString() == queryKey.toString() && type == "removed") {
      remove();
      unsubscribe?.();
    }
  });
};
