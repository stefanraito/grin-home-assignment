import { RangeKey } from '../components/DateFilter';


export const iso = (date: Date): string => date.toISOString().split('T')[0];

export const rangeToDates = (key: RangeKey): [string | undefined, string | undefined] => {
  const today = new Date();
  switch (key) {
    case 'today':
      return [iso(today), iso(today)];
    case '7d':
      return [iso(new Date(today.getTime() - 7 * 864e5)), iso(today)];
    case '30d':
      return [iso(new Date(today.getTime() - 30 * 864e5)), iso(today)];
    default:
      return [undefined, undefined];
  }
};