import { MetricKey, metricDefs } from '../data/metricDefs';
import { PaginatedPatients, Patient, Satisfaction, Stats } from '../types';


export function computeCounts(
  pages: PaginatedPatients[] | undefined,
): Record<Satisfaction, number> {
  const all: Patient[] = pages?.flatMap((p) => p.data) ?? [];
  return all.reduce<Record<Satisfaction, number>>(
    (acc, p) => {
      acc[p.satisfaction] += 1;
      return acc;
    },
    { negative: 0, neutral: 0, positive: 0 },
  );
}

/**
 * Safely extracts and formats a metric value for display.
 * • Returns '-' while loading or if stats object is undefined.
 * • If the metric definition has a custom formatter, uses it.
 */
export const statVal = (
  key: MetricKey,
  stats: Stats | undefined,
  isLoading: boolean,
): string | number => {
  if (isLoading || !stats) {
    return '-';
  }
  const def = metricDefs.find((m) => m.key === key);

  const raw = (stats as any)[key];

  // apply custom formatter if present
  return def?.format ? def.format(raw) : raw;
};