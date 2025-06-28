export interface Employee {
  id: string;
  name: string;
  lastCommunicationDate: string;
  satisfaction: 'positive' | 'neutral' | 'negative';
}