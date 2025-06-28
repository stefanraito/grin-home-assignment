import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api/stats';

export const useStats = (from?: string, to?: string) =>
  useQuery({
    queryKey: ['stats', from, to],
    queryFn: async () => {
      try {
        return await fetchStats(from, to);
      } catch (err) {
        console.error('useStats queryFn error:', err);
        throw err;
      }
    },
    refetchInterval: 60_000,
  });