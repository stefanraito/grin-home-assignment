import { FC } from 'react';

export type RangeKey = 'today' | '7d' | '30d' | 'all';

interface Props {
  value: RangeKey;
  onChange: (_value: RangeKey) => void;
}

const ranges: Record<RangeKey, string> = {
  today: '1D',
  '7d': '7D',
  '30d': '30D',
  all: 'ALL',
};

const DateFilter: FC<Props> = ({ value, onChange }) => (
  <div role="radiogroup" className="flex space-x-2">
    {(Object.entries(ranges) as [RangeKey, string][]).map(([key, label]) => (
      <button
        key={key}
        type="button"
        role="radio"
        aria-checked={value === key}
        className={`px-3 py-1 rounded-full text-sm border transition-colors ${
          value === key
            ? 'bg-grin text-white'
            : 'border-gray-300 text-gray-600 hover:bg-gray-100'
        }`}
        onClick={() => onChange(key)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default DateFilter;