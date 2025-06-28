/* eslint
  react/require-default-props: off,
  consistent-return: off
*/
import { FC, useEffect, useRef } from 'react';
import { usePatients } from '../hooks/usePatients';
import PatientRow from './PatientRow';
import { PaginatedPatients, Patient } from '../types';

interface Props {
  from?: string;
  to?: string;
  sentiment?: 'all' | 'negative' | 'neutral' | 'positive';
}

const PatientsList: FC<Props> = ({ from, to, sentiment = 'all' }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = usePatients(from, to);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  /* infinite-scroll observer */
  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) fetchNextPage();
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  if (status === 'loading') return <p>Loading patients…</p>;
  if (status === 'error')   return <p>Error: {(error as Error).message}</p>;

  /* flatten pages & apply sentiment filter */
  const all = data?.pages.flatMap((page: PaginatedPatients) => page.data) ?? [];
  const visible: Patient[] =
    sentiment === 'all'
      ? all
      : all.filter((p: Patient) => p.satisfaction === sentiment);

  /* longest name length used as CSS variable */
  const nameColWidth = `${Math.max(...visible.map((p) => p.name.length), 4)}ch`;

  return (
    <ul
      className="divide-y divide-gray-200 max-h-[calc(100vh-280px)] overflow-auto"
      aria-label="patients list"
      style={{ ['--name-col' as any]: nameColWidth }}
    >
      {visible.map((p) => (
        <PatientRow key={p.id} patient={p} />
      ))}

      {/* sentinel for infinite scroll */}
      <div ref={sentinelRef} />

      {isFetchingNextPage && (
        <p className="text-center py-2 text-sm text-gray-500">Loading…</p>
      )}
    </ul>
  );
};

export default PatientsList;