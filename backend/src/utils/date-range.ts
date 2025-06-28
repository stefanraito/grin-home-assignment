export interface DateRange {
  from?: Date;
  to?: Date;
}

export const withinRange = (date: Date, range: DateRange): boolean => {
  const { from, to } = range;
  if (from && date < from) return false;
  if (to && date > to) return false;
  return true;
};