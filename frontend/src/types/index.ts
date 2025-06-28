export interface Stats {
  liveCalls: number;
  brushings: number;
  instructions: number;
  tasks: number;
  likes: number;
  timeSavedMinutes: number;
}

export type Satisfaction = 'positive' | 'neutral' | 'negative';

export interface Patient {
  id: string;
  name: string;
  lastCommunicationDate: string;
  satisfaction: Satisfaction;
}

export interface PaginatedPatients {
  data: Patient[];
  total: number;
}