import meetingsIcon     from '../assets/meetingsIcon.svg';
import tasksIcon        from '../assets/tasks.svg';
import brushingIcon     from '../assets/brushing.svg';
import likesIcon        from '../assets/likes.svg';
import timesavedIcon    from '../assets/timesaved.svg';
import instructionsIcon from '../assets/instructions.svg';

export type MetricKey =
  | 'liveCalls'
  | 'tasks'
  | 'brushings'
  | 'likes'
  | 'timeSavedMinutes'
  | 'instructions';

export interface MetricDef {
  key: MetricKey;
  label: string;
  icon: string;
  format?: (v: number) => string;
}

/** single source-of-truth for dashboard metrics */
export const metricDefs: MetricDef[] = [
  { key: 'liveCalls',        label: 'Meetings Completed',  icon: meetingsIcon },
  { key: 'tasks',            label: 'Tasks Completed',     icon: tasksIcon },
  { key: 'brushings',        label: 'Brushing',            icon: brushingIcon },
  { key: 'likes',            label: 'Likes',               icon: likesIcon },
  {
    key: 'timeSavedMinutes',
    label: 'Time Saved',
    icon:  timesavedIcon,
    format: (v) => `${Math.floor(v / 60)}h ${v % 60}m`,
  },
  { key: 'instructions',     label: 'Instructions Sent',   icon: instructionsIcon },
];