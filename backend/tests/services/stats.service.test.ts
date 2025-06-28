

import { getStats } from '../../src/services/stats.service';
import { datasetRepository } from '../../src/repositories/dataset.repository';

jest.mock('../../src/repositories/dataset.repository');

const mockedGetData = datasetRepository.getData as jest.Mock;

const ev = (date: string, extra: Partial<Record<string, any>> = {}) => ({
  id: crypto.randomUUID(),
  createdAt: date,
  ...extra,
});

describe('StatsService.getStats', () => {
  beforeEach(() => {
    mockedGetData.mockReset();
  });

  it('returns correct counts for full dataset', () => {
    mockedGetData.mockReturnValueOnce({
      liveCalls: [ev('2025-06-01'), ev('2025-06-02')],
      communication: [
        ev('2025-06-01', { type: 'brushing' }),
        ev('2025-06-02', { type: 'instructions' }),
        ev('2025-06-03', { type: 'brushing' }),
      ],
      tasks: [ev('2025-06-02'), ev('2025-06-03')],
      likes: [ev('2025-06-01')],
    });

    const stats = getStats();

    expect(stats).toMatchObject({
      liveCalls: 2,
      brushings: 2,
      instructions: 1,
      tasks: 2,
      likes: 1,
      timeSavedMinutes: 10, // 2 liveCalls * 5
    });
    expect(mockedGetData).toHaveBeenCalledTimes(1);
  });

  it('filters by date range', () => {
    mockedGetData.mockReturnValueOnce({
      liveCalls: [ev('2025-06-01'), ev('2025-07-01')],
      communication: [
        ev('2025-06-15', { type: 'instructions' }),
        ev('2025-07-15', { type: 'brushing' }),
      ],
      tasks: [ev('2025-06-20')],
      likes: [ev('2025-07-05')],
    });

    const from = new Date('2025-07-01');
    const to = new Date('2025-07-31');

    const stats = getStats(from, to);

    expect(stats).toMatchObject({
      liveCalls: 1,
      brushings: 1,
      instructions: 0,
      tasks: 0,
      likes: 1,
      timeSavedMinutes: 5,
    });
  });

  it('propagates repository error', () => {
    mockedGetData.mockImplementationOnce(() => {
      throw new Error('DB down');
    });

    expect(() => getStats()).toThrow('DB down');
  });
});