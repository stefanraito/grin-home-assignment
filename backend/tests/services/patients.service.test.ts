

import { getPatients } from '../../src/services/patients.service';
import { datasetRepository } from '../../src/repositories/dataset.repository';

jest.mock('../../src/repositories/dataset.repository');
const mockedGetData = datasetRepository.getData as jest.Mock;

const patient = (id: string, date: string, satisfaction = 'positive' as const) => ({
  id,
  name: `Patient ${id}`,
  lastCommunicationDate: date,
  satisfaction,
});

describe('PatientsService.getPatients', () => {
  beforeEach(() => {
    mockedGetData.mockReset();
  });

  it('paginates data and returns total count', () => {
    // build 25 dummy patients (dates irrelevant)
    const patients = Array.from({ length: 25 }, (_, i) =>
      patient(`p${i + 1}`, '2025-06-10'),
    );

    mockedGetData.mockReturnValueOnce({
      patientsSatisfaction: { patientsData: patients },
    });

    const { data, total } = getPatients(2, 10); // page 2, limit 10

    expect(total).toBe(25);
    expect(data).toHaveLength(10);
    expect(data[0].id).toBe('p11');
  });

  it('filters by from/to dates before paginating', () => {
    const pts = [
      patient('a', '2025-06-01'),
      patient('b', '2025-07-05'),
      patient('c', '2025-07-10'),
      patient('d', '2025-08-01'),
    ];

    mockedGetData.mockReturnValueOnce({
      patientsSatisfaction: { patientsData: pts },
    });

    const from = new Date('2025-07-01');
    const to = new Date('2025-07-31');

    const { data, total } = getPatients(1, 20, from, to);

    expect(total).toBe(2);
    expect(data.map((p) => p.id)).toEqual(['b', 'c']);
  });

  it('propagates repository errors', () => {
    mockedGetData.mockImplementationOnce(() => {
      throw new Error('load fail');
    });

    expect(() => getPatients()).toThrow('load fail');
  });
});