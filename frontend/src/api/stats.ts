import { http } from './http';
import { Stats } from '../types';

export const fetchStats = async (
  from?: string,
  to?: string,
): Promise<Stats> => {
  try {
    const params: Record<string, string> = {};
    if (from) {
      params.from = from;
    }
    if (to) {
      params.to = to;
    }

    const { data } = await http.get<Stats>('/stats', { params });
    return data;
  } catch (err) {
    console.error('API fetchStats error:', err);
    throw err;
  }
};