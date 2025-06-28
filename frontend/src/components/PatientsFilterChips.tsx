import { FC } from 'react';
import positiveSvg from '../assets/positive.svg';
import neutralSvg from '../assets/neutral.svg';
import negativeSvg from '../assets/negative.svg';

export type SentimentKey = 'all' | 'negative' | 'neutral' | 'positive';

interface Props {
  value: SentimentKey;
  onChange: (_: SentimentKey) => void;
  counts: { negative: number; neutral: number; positive: number };
}

const chipStyle =
  'px-3 py-1 rounded-full text-xs font-medium transition-colors';

const PatientsFilterChips: FC<Props> = ({ value, onChange, counts }) => {
  const items: {
    key: SentimentKey;
    label: string;
    icon: string;
    count: number;
  }[] = [
    {
      key: 'negative',
      label: 'Can Be Better',
      icon: negativeSvg,
      count: counts.negative,
    },
    {
      key: 'neutral',
      label: 'Neutral',
      icon: neutralSvg,
      count: counts.neutral,
    },
    {
      key: 'positive',
      label: 'Positive',
      icon: positiveSvg,
      count: counts.positive,
    },
  ];

  return (
    <div className="flex gap-2">
      {items.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => onChange(value === c.key ? 'all' : c.key)}
          className={`${chipStyle} ${
            value === c.key
              ? 'bg-grin text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-pressed={value === c.key}
        >
          <span className="flex items-center gap-1">
            <img src={c.icon} alt={c.key} className="w-4 h-4" />
            <span>{c.label}</span>
            <span>{c.count}</span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default PatientsFilterChips;