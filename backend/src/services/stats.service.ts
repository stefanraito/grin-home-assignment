import { datasetRepository } from '../repositories/dataset.repository';
import { EventModel } from '../models/event.model';

const filterByDate = <T extends { createdAt: string }>(
  items: T[],
  from?: Date,
  to?: Date,
) =>
  items.filter(({ createdAt }) => {
    const d = new Date(createdAt);
    return (!from || d >= from) && (!to || d <= to);
  });

export function getStats(from?: Date, to?: Date) {
  try {
    const {
      liveCalls,
      communication,
      tasks,
      likes,
    }: {
      liveCalls: EventModel[];
      communication: EventModel[];
      tasks: EventModel[];
      likes: EventModel[];
    } = datasetRepository.getData();

    const commFiltered = filterByDate(communication, from, to);

    return {
      liveCalls: filterByDate(liveCalls, from, to).length,
      brushings: commFiltered.filter((c) => c.type === 'brushing').length,
      instructions: commFiltered.filter((c) => c.type === 'instructions').length,
      tasks: filterByDate(tasks, from, to).length,
      likes: filterByDate(likes, from, to).length,
      timeSavedMinutes: filterByDate(liveCalls, from, to).length * 5,
    } as const;
  } catch (err) {
    console.error('StatsService.getStats error:', err);
    throw err;
  }
}