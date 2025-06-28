import { datasetRepository } from '../repositories/dataset.repository';
import { Patient } from '../models/patient.model';

const filterByDate = (items: Patient[], from?: Date, to?: Date) =>
  items.filter(({ lastCommunicationDate }) => {
    const d = new Date(lastCommunicationDate);
    return (!from || d >= from) && (!to || d <= to);
  });

export function getPatients(
  page = 1,
  limit = 20,
  from?: Date,
  to?: Date,
) {
  try {
    const patients = datasetRepository
      .getData()
      .patientsSatisfaction.patientsData;

    const filtered = filterByDate(patients, from, to);
    const slice = filtered.slice((page - 1) * limit, page * limit);

    return { data: slice, total: filtered.length };
  } catch (err) {
    console.error('PatientsService.getPatients error:', err);
    throw err;
  }
}