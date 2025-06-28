import { useQuery } from '@tanstack/react-query';
import { fetchSatisfaction } from '../api/satisfaction';


export const useSatisfaction = (from?: string, to?: string) =>
  useQuery({
    queryKey: ['satisfaction', from, to],
    queryFn: async () => {
      try {
        return await fetchSatisfaction(from, to);
      } catch (err) {
        console.error('useSatisfaction queryFn error:', err);
        throw err;
      }
    },
    staleTime: 60_000,
  });