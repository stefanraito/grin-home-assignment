import { http } from './http';

export interface SentimentCounts {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SatisfactionResponse {
  employees: SentimentCounts;
  patients: SentimentCounts;
}


export const fetchSatisfaction = async (
  from?: string,
  to?: string,
): Promise<SatisfactionResponse> => {
  const params: Record<string, string> = {};
  if (from) params.from = from;
  if (to) params.to = to;
  const { data } = await http.get<SatisfactionResponse>('/satisfaction', { params });
  return data;
};