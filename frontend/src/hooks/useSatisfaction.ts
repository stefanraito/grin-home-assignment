import { useQuery } from '@tanstack/react-query';
import { fetchSatisfaction } from '../api/satisfaction';

export const useSatisfaction = (from?: string, to?: string) =>
  useQuery({
    queryKey: ['satisfaction', from, to],
    queryFn: () => fetchSatisfaction(from, to),
    staleTime: 60_000,
  });