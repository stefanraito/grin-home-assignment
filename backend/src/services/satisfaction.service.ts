import { datasetRepository } from '../repositories/dataset.repository';
import type { SatisfactionResponse } from '../types/dataset.types';

export function getSatisfaction(): SatisfactionResponse {
  try {
    const data = datasetRepository.getData();
    return {
      employees: data.employeesSatisfaction.summary,
      patients: data.patientsSatisfaction.summary,
    };
  } catch (err) {
    console.error('SatisfactionService.getSatisfaction error:', err);
    throw err;
  }
}