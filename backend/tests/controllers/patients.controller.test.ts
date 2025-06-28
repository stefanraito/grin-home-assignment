import request from 'supertest';
import app from '../../src/app';
import { getPatients } from '../../src/services/patients.service';

jest.mock('../../src/services/patients.service');
const mockedGetPatients = getPatients as jest.MockedFunction<typeof getPatients>;

describe('patientsController', () => {
  beforeEach(() => {
    mockedGetPatients.mockReset();
  });

  it('returns 200 with data & total when query params are valid', async () => {
    mockedGetPatients.mockReturnValueOnce({
      data: [{ id: 'p1', name: 'John Doe', lastCommunicationDate: '2025-06-10', satisfaction: 'positive' }],
      total: 1,
    });

    const res = await request(app).get('/api/v1/patients?page=1&limit=10');

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ total: 1 });
    expect(mockedGetPatients).toHaveBeenCalledWith(1, 10, undefined, undefined);
  });

  it('forwards from/to query params as Date objects', async () => {
    mockedGetPatients.mockReturnValueOnce({ data: [], total: 0 });

    await request(app).get('/api/v1/patients?from=2025-06-01&to=2025-06-30');

    const [pageArg, limitArg, fromArg, toArg] = mockedGetPatients.mock.calls[0];
    expect(pageArg).toBe(1);
    expect(limitArg).toBe(20);
    expect(fromArg).toEqual(new Date('2025-06-01'));
    expect(toArg).toEqual(new Date('2025-06-30'));
  });

  it('returns 400 on invalid date', async () => {
    const res = await request(app).get('/api/v1/patients?from=bad-date');
    expect(res.status).toBe(400);
    expect(mockedGetPatients).not.toHaveBeenCalled();
  });

  it('returns 500 when service throws', async () => {
    mockedGetPatients.mockImplementationOnce(() => {
      throw new Error('boom');
    });

    const res = await request(app).get('/api/v1/patients');

    expect(res.status).toBe(500);
    expect(res.body).toMatchObject({
      error: 'Internal Server Error',
      message: 'boom',
    });
  });
});