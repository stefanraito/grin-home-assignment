import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPatients } from '../api/patients';
import { PaginatedPatients } from '../types';


export const usePatients = (from?: string, to?: string) =>
  useInfiniteQuery({
    queryKey: ['patients', from, to],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      try {
        return await fetchPatients(pageParam, 20, from, to);
      } catch (err) {
        console.error('usePatients queryFn error:', err);
        throw err;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: PaginatedPatients,
      _pages: PaginatedPatients[],
      lastPageParam: number,
    ) => {
      const { total } = lastPage;
      const next = lastPageParam + 1;

      if (next <= Math.ceil(total / 20)) {
        return next;
      }

      return undefined;
    },
    staleTime: 60_000,
  });