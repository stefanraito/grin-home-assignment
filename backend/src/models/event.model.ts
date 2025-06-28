export type EntityType = 'liveCall' | 'communication' | 'task' | 'like';

export interface EventModel {
  id: string;
  createdAt: string;
  entityType: EntityType;
  type?: 'brushing' | 'instructions';
}