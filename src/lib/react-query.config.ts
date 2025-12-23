import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1, // retry 1 time if the request fails
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
    mutations: {
      retry: false, // do not retry if the mutation fails
    },
  },
});
