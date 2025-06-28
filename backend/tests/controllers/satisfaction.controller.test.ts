import request from 'supertest';
import app from '../../src/app';
import { getSatisfaction } from '../../src/services/satisfaction.service';

jest.mock('../../src/services/satisfaction.service');
const mockedGetSatisfaction = getSatisfaction as jest.MockedFunction<typeof getSatisfaction>;

describe('satisfactionController', () => {
  beforeEach(() => {
    mockedGetSatisfaction.mockReset();
  });

  it('returns 200 with employees & patients summary', async () => {
    mockedGetSatisfaction.mockReturnValueOnce({
      employees: { positive: 3, neutral: 1, negative: 0 },
      patients:  { positive: 5, neutral: 2, negative: 1 },
    });

    const res = await request(app).get('/api/v1/satisfaction');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      employees: { positive: 3, neutral: 1, negative: 0 },
      patients:  { positive: 5, neutral: 2, negative: 1 },
    });
    expect(mockedGetSatisfaction).toHaveBeenCalledTimes(1);
  });

  it('returns 500 when service throws', async () => {
    mockedGetSatisfaction.mockImplementationOnce(() => {
      throw new Error('boom');
    });

    const res = await request(app).get('/api/v1/satisfaction');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: 'Internal Server Error',
      message: 'boom',
    });
  });
});