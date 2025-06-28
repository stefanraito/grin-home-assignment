import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPatients } from '../api/patients';
import { PaginatedPatients } from '../types';


export const usePatients = (from?: string, to?: string) =>
  useInfiniteQuery({
    queryKey: ['patients', from, to],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchPatients(pageParam, 20, from, to),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: PaginatedPatients,
      _pages: PaginatedPatients[],
      lastPageParam: number,
    ) => {
      const { total } = lastPage;
      const next = lastPageParam + 1;
      return next <= Math.ceil(total / 20) ? next : undefined;
    },
    staleTime: 60_000,
  });