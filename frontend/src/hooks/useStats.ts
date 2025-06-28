import { useQuery } from '@tanstack/react-query';
import { fetchStats } from '../api/stats';

export const useStats = (from?: string, to?: string) =>
  useQuery({
    queryKey: ['stats', from, to],
    queryFn: () => fetchStats(from, to),
    refetchInterval: 60_000,
  });