import { http } from './http';
import { PaginatedPatients } from '../types';

export const fetchPatients = async (
  page: number,
  limit: number,
  from?: string,
  to?: string,
): Promise<PaginatedPatients> => {
  try {
    const params: Record<string, string | number> = { page, limit };
    if (from) {
      params.from = from;
    }
    if (to) {
      params.to = to;
    }

    const { data } = await http.get<PaginatedPatients>('/patients', { params });
    return data;
  } catch (err) {
    console.error('API fetchPatients error:', err);
    throw err;
  }
};
