import { getSatisfaction } from '../../src/services/satisfaction.service';
import { datasetRepository } from '../../src/repositories/dataset.repository';

jest.mock('../../src/repositories/dataset.repository');
const mockedGetData = datasetRepository.getData as jest.Mock;

describe('SatisfactionService.getSatisfaction', () => {
  beforeEach(() => {
    mockedGetData.mockReset();
  });

  it('returns summary from repository data', () => {
    mockedGetData.mockReturnValueOnce({
      employeesSatisfaction: {
        summary: { positive: 2, neutral: 1, negative: 0 },
      },
      patientsSatisfaction: {
        summary: { positive: 4, neutral: 2, negative: 1 },
      },
    });

    const result = getSatisfaction();

    expect(result).toEqual({
      employees: { positive: 2, neutral: 1, negative: 0 },
      patients: { positive: 4, neutral: 2, negative: 1 },
    });
    expect(mockedGetData).toHaveBeenCalledTimes(1);
  });

  it('propagates repository error', () => {
    mockedGetData.mockImplementationOnce(() => {
      throw new Error('fail');
    });

    expect(() => getSatisfaction()).toThrow('fail');
  });
});