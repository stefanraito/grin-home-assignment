import { FC, ReactNode, isValidElement, cloneElement } from 'react';
import Card from './Card';

interface Props {
  icon: ReactNode;
  label: string;
  value: string | number;
}


const MetricCard: FC<Props> = ({ icon, label, value }) => {
  const renderedIcon = isValidElement(icon) && (icon.type as any) === 'img'
    ? cloneElement(icon as any, { className: 'w-10 h-10' })
    : <span className="text-4xl">{icon}</span>;

  return (
    <Card className="h-[120px] !flex !flex-row !items-center gap-6">
      <div className="w-12 flex justify-center items-center shrink-0">
        {renderedIcon}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </Card>
  );
};

export default MetricCard;