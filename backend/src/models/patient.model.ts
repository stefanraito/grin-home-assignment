export interface Patient {
  id: string;
  name: string;
  lastCommunicationDate: string;
  satisfaction: 'positive' | 'neutral' | 'negative';
}