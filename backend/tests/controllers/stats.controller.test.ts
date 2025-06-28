import request from 'supertest';
import app from '../../src/app';
import { getStats } from '../../src/services/stats.service';

jest.mock('../../src/services/stats.service');

const mockedGetStats = getStats as jest.MockedFunction<typeof getStats>;

describe('statsController', () => {
  beforeEach(() => {
    mockedGetStats.mockReset();
  });

  it('returns 200 and stats object (no query params)', async () => {
    mockedGetStats.mockReturnValueOnce({
      liveCalls: 10,
      brushings: 5,
      instructions: 2,
      tasks: 3,
      likes: 4,
      timeSavedMinutes: 50,
    });

    const res = await request(app).get('/api/v1/stats');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('liveCalls', 10);
    expect(mockedGetStats).toHaveBeenCalledWith(undefined, undefined);
  });

  it('forwards valid from/to params as Date objects', async () => {
    mockedGetStats.mockReturnValueOnce({ liveCalls: 0, brushings: 0, instructions: 0, tasks: 0, likes: 0, timeSavedMinutes: 0 });

    const res = await request(app).get('/api/v1/stats?from=2025-01-01&to=2025-01-31');

    expect(res.status).toBe(200);

    const [fromArg, toArg] = mockedGetStats.mock.calls[0];
    expect(fromArg).toEqual(new Date('2025-01-01'));
    expect(toArg).toEqual(new Date('2025-01-31'));
  });

  it('returns 400 on invalid date', async () => {
    const res = await request(app).get('/api/v1/stats?from=bad-date');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(mockedGetStats).not.toHaveBeenCalled();
  });

  it('returns 500 if service throws', async () => {
    mockedGetStats.mockImplementationOnce(() => {
      throw new Error('boom');
    });

    const res = await request(app).get('/api/v1/stats');

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({
      error: 'Internal Server Error',
      message: 'boom',
    });
  });
});