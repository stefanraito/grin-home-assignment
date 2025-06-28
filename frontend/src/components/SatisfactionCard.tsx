import { FC, ReactNode } from 'react';
import Card from './Card';

import positiveSvg from '../assets/positive.svg';
import neutralSvg  from '../assets/neutral.svg';
import negativeSvg from '../assets/negative.svg';

interface Props {
  title: string;
  counts: { negative: number; neutral: number; positive: number };
  description: ReactNode;
}

const widthPct = (n: number, total: number) =>
  `${total === 0 ? 0 : (n / total) * 100}%`;

const SatisfactionCard: FC<Props> = ({ title, counts, description }) => {
  const total = counts.negative + counts.neutral + counts.positive;

  return (
    <Card className="row-span-2 h-[256px]">
      <h3 className="font-semibold text-center">{title}</h3>

      <div className="flex justify-center gap-6 text-sm">
        {counts.negative > 0 && (
          <div className="flex items-center gap-1">
            <img src={negativeSvg} className="w-4 h-4" alt="negative" />
            {counts.negative}
          </div>
        )}
        {counts.neutral > 0 && (
          <div className="flex items-center gap-1">
            <img src={neutralSvg} className="w-4 h-4" alt="neutral" />
            {counts.neutral}
          </div>
        )}
        {counts.positive > 0 && (
          <div className="flex items-center gap-1">
            <img src={positiveSvg} className="w-4 h-4" alt="positive" />
            {counts.positive}
          </div>
        )}
      </div>

      {/* stacked progress bar */}
      <div className="relative w-full h-3 rounded bg-gray-200 overflow-hidden">
        {/* segments overlay; keeps gray background visible when any segment is 0% */}
        <div className="absolute inset-0 flex">
          <div
            className="bg-red-500"
            style={{ width: widthPct(counts.negative, total) }}
          />
          <div
            className="bg-yellow-400"
            style={{ width: widthPct(counts.neutral, total) }}
          />
          <div
            className="bg-green-500"
            style={{ width: widthPct(counts.positive, total) }}
          />
        </div>
      </div>

      <div className="flex justify-between text-xs px-1 text-gray-600">
        <span>Can Be Better</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>

      <p className="text-xs text-gray-500 leading-5 text-center">
        {description}
      </p>
    </Card>
  );
};

export default SatisfactionCard;